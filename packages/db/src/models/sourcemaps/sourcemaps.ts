import AdmZip from 'adm-zip';
import { clickhouse } from '../../modules/clickhouse';
import { s3Client, getBucket, PutObjectCommand, deleteDirectory } from '../../modules/s3Client';
import { Project } from '../../types';

export async function create({
  fileBuffer,
  version,
  project,
}: {
  fileBuffer: Buffer;
  version: string;
  project: Project;
}) {
  const bucketName = await getBucket();
  const directory = `${project.id}/${version}/`;

  await deleteDirectory(directory);

  const zip = new AdmZip(fileBuffer);

  await Promise.all(
    zip.getEntries().map(async (entry) => {
      if (entry.isDirectory) return;

      const key = `${project.id}/${version}/${entry.entryName}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: key,
          Body: entry.getData(),
          ContentType: 'text/plain',
        }),
      );
    }),
  );

  const result = await clickhouse.query({
    query: `SELECT count() FROM sourcemaps WHERE project_id = {projectId: String} AND version = {version: String}`,
    query_params: {
      projectId: project.id,
      version,
    },
    format: 'JSONEachRow',
  });

  const [row] = await result.json<{ 'count()': string }[]>();

  if (row['count()'] !== '0') return;

  await clickhouse.insert({
    table: 'sourcemaps',
    values: [
      {
        project_id: project.id,
        version,
      },
    ],
    format: 'JSONEachRow',
  });
}
