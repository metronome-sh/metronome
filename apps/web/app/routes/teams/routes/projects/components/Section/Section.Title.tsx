import { type FunctionComponent } from 'react';

export const SectionTitle: FunctionComponent<{ title: string }> = ({
  title,
}) => {
  return (
    <div className="py-2 md:pt-4 px-4 md:px-6">
      <h2 className="text-lg text-foreground">{title}</h2>
    </div>
  );
};
