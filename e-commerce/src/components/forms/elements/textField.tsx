import { CSSProperties } from 'react';

type Props = {
  classNameComponent?: string;
  classNameTitle?: string;
  classNameBody?: string;
  title?: string;
  value?: string;
  styleComponent?: CSSProperties;
  styleTitle?: CSSProperties;
  styleBody?: CSSProperties;
};

function TextField({
  classNameComponent = 'textfield-component',
  classNameTitle = 'textfield-title',
  classNameBody = 'textfield-body',
  title,
  value,
  styleComponent,
  styleTitle,
  styleBody,
}: Props) {
  return (
    <div className={classNameComponent} style={styleComponent}>
      {title && (
        <div className={classNameTitle} style={styleTitle}>
          {title}
        </div>
      )}
      <div className={classNameBody} style={styleBody}>
        {value}
      </div>
    </div>
  );
}

export default TextField;
