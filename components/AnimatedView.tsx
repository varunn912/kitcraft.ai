import React, { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

interface AnimatedViewProps {
  children: React.ReactNode;
  viewKey: string;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({ children, viewKey }) => {
  // React 18 StrictMode and react-transition-group require a nodeRef
  // to be passed to CSSTransition to avoid using the deprecated findDOMNode API.
  const nodeRef = useRef(null);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={viewKey}
        nodeRef={nodeRef} // Pass the ref to avoid findDOMNode issues.
        timeout={300}     // Set timeout to match CSS transition duration.
        classNames="fade"
        unmountOnExit     // Unmount the component after it finishes exiting.
      >
        {/* Attach the ref to the DOM element that is being animated. */}
        <div ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default AnimatedView;
