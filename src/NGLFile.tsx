import React, { useEffect, useRef } from 'react';
import * as NGL from 'ngl';

interface NGLFileProps {
  width: string;
  height: string;
  file?: File;
}

const NGLFile: React.FC<NGLFileProps> = ({ width, height, file }) => {
  const stageRef = useRef<NGL.Stage | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      stageRef.current = new NGL.Stage(containerRef.current);
    }
  }, []);

  useEffect(() => {
    if (file && stageRef.current) {
      stageRef.current.removeAllComponents();
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target && stageRef.current) {
          const contents = event.target.result as string;
          const blob = new Blob([contents], { type: 'application/octet-stream' });
          const structure = await NGL.autoLoad(blob, { ext: 'pdb' });
          
          const component = stageRef.current.addComponentFromObject(structure);
          
          
          
          
          if (component instanceof NGL.Component) {
            component.addRepresentation('cartoon', { aspectRatio: 2.5 });

            // Add a representation for the HETATM particles (non-standard residues)
            component.addRepresentation('ball+stick', { sele: 'HETATM' });

            stageRef.current.autoView();
          }
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return (
    
    <div ref={containerRef} style={{ width:"100%", height:"100%"}}></div>
  
  );
};

export default NGLFile;
