import * as React from 'react';
import './style.css';

interface Props {
  data?: Array<any>;
  buffTop?: number;
  buffBottom?: number;
  height?: string;
}

const App: React.FC<Props> = (props) => {
  const { data = [], buffBottom = 10, buffTop = 10,height = '100vh' } = props;
  const [position, setPosition] = React.useState({ start: 0, end: 1 });
  const [params, setParams] = React.useState({
    count: 0,
    itemHeight: 0,
  });
  const [paddingTop, setPaddingTop] = React.useState(0);
  const containerRef = React.useRef(null);
  const panelRef = React.useRef(null);
  const visibleList = React.useMemo(() => {
    return data.slice(position.start, position.end);
  }, [position.start, position.end]);
  React.useEffect(() => {
    const itemHeight = panelRef.current.firstElementChild.offsetHeight;
    panelRef.current.style.height = data.length * itemHeight + 'px';
    const count = Math.floor(containerRef.current.offsetHeight / itemHeight);
    setPosition({ ...position, end: count + buffBottom });
    setParams({ count, itemHeight });
  }, []);
  let timer;
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const startValue = Math.floor(e.target.scrollTop / params.itemHeight);
      let buff = startValue > buffTop ? buffTop : startValue;
      const start = startValue - buff;
      const end = startValue + params.count + buffBottom;
      setPaddingTop(start * params.itemHeight);
      setPosition({ start, end });
    }, 200);
  };
  return (
    <div
      className="container"
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height }}
    >
      <div className="panel" ref={panelRef} style={{ paddingTop }}>
        {visibleList.map((item) => {
          return (
            <div key={item} className="item">
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
