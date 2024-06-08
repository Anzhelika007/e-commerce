import './powerLayer.scss';

function PowerLayer({
  displayNoneBlock,
}: {
  displayNoneBlock: React.CSSProperties;
}) {
  return <div className="power-layer" style={displayNoneBlock} />;
}

export default PowerLayer;
