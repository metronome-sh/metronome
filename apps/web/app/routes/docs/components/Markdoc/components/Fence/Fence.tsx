// import {
//   faClipboard,
//   faClipboardCheck,
//   faFile,
// } from '@fortawesome/pro-light-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Highlight, Language, themes } from 'prism-react-renderer';
import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';

export type FenceProps = PropsWithChildren<{
  language: string;
  content: string;
  className?: string;
  process?: boolean;
  title?: string;
}>;

export const Fence: FunctionComponent<FenceProps> = ({
  language,
  // content,
  className,
  children,
  title,
}) => {
  const content = (
    Array.isArray(children)
      ? (children as string[]).join('')
      : typeof children === 'string'
      ? children
      : ''
  ).replace(/\n$/, '');

  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard?.writeText(content);
    document.execCommand('copy', true, content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [setCopied, content]);

  return (
    <div className={clsx(className, 'relative my-2 rounded-lg')}>
      <Highlight
        // {...defaultProps}
        code={content}
        language={language as Language}
        theme={themes.nightOwl}
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <>
            <div className="flex items-center justify-between rounded-t-lg border bg-muted py-2 pl-4 pr-2">
              <span className="text-sm tracking-wide text-white/80">
                {title?.includes('.') ? (
                  <>
                    <div>file</div>
                    {/* <FontAwesomeIcon className="pr-2" icon={faFile} /> */}
                  </>
                ) : null}
                {title}
              </span>
              <div className="flex items-center">
                {copied ? (
                  <span className="mt-0.5 text-xs font-normal text-[#b3b5c1]">
                    Copied!
                  </span>
                ) : null}
                <button className="px-2 text-white" onClick={copy}>
                  copy
                  {/* <FontAwesomeIcon
                    icon={copied ? faClipboardCheck : faClipboard}
                  /> */}
                </button>
              </div>
            </div>

            <div
              className="overflow-auto overflow-x-scroll rounded-b-lg border border-t-0 bg-background p-4 font-mono text-sm"
              // style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line, key: i });

                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={clsx(lineProps.className, 'whitespace-nowrap')}
                  >
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token, key });

                      return (
                        <span
                          key={key}
                          {...tokenProps}
                          className={clsx(
                            tokenProps.className,
                            'whitespace-pre ',
                            key === line.length - 1 && 'pr-4',
                          )}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Highlight>
    </div>
  );
};
