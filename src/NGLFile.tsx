import React, { useEffect, useRef } from 'react';
import * as NGL from 'ngl';

interface NGLFileProps {
  width: string;
  height: string;
  file?: File;
}

const NGLFile: React.FC<NGLFileProps> = ({ file, width, height }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  let stage: any;
  useEffect(() => {
    if (file && viewerRef.current) {
      if (stage) {
        stage.removeAllComponents();
      } else {
        stage = new NGL.Stage(viewerRef.current);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const pdbData = e.target?.result;
        if (pdbData) {
          stage.loadFile(file, {defaultRepresentation: true }).then((o: any) => {
            stage.autoView();
          });
        }
      };
      reader.readAsText(file);
    }

    return () => {
      if (stage) {
        stage.dispose();
      }
    };
  }, [file]);

  return <div ref={viewerRef} style={{ width: width, height: height }}></div>;
};

export default NGLFile;
