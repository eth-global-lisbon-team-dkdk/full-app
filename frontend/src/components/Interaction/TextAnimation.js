import { useState, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';

const TextAnimation = (props) => {
  const [visibleText, setVisibleText] = useState('');
  const { scrollToBottom } = useApp();
  
  useEffect(() => {
    let words = props.text.split(' ');
    let index = 0;

    const interval = setInterval(() => {
      setVisibleText(prevVisibleText => {
        if (index > words.length) {
          clearInterval(interval);
          props.onFinishedWriting();
          return;
        }

        scrollToBottom();

        return words.slice(0, index + 1).join(' ');
      });
      index++;
    }, 100);

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, [props, scrollToBottom]);

  return <div>{visibleText}</div>;
};

export default TextAnimation;
