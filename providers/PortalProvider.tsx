import { Fragment, FunctionComponent, PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";


interface Element {
  name: string;
  component: React.ReactNode;
}

export interface PortalCtx {
  addComponent: (element: Element) => void,
  removeComponent: (name: string) => void,
}

export const PortalContext = createContext<PortalCtx>({
  addComponent: () => { },
  removeComponent: () => { }
})


export interface PortalProps {
  children: React.ReactNode,
  name: string
}



export const Portal: React.FC<PortalProps> = ({ children, name }) => {
  const { addComponent, removeComponent } = useContext(PortalContext);

  useEffect(() => {
    addComponent({ name, component: children });
    return () => {
      removeComponent(name);
    }
  }, [children, name]);

  return null;
}




const PortalProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [components, setComponents] = useState<Record<string, React.ReactNode>>({});

  const addComponent = useCallback(({ name, component }: Element) => {
    setComponents(prevComponents => ({
      ...prevComponents,
      [name]: component
    }));
  }, []);

  const removeComponent = useCallback((name: string) => {
    setComponents(prevComponents => {
      const { [name]: _, ...rest } = prevComponents;
      return rest;
    });
  }, []);


  return (
    <PortalContext.Provider
      value={{
        addComponent,
        removeComponent,
      }}
    >
      <Fragment>
        {children}
      </Fragment>
      <Fragment>
        {Object.entries(components).map(([_, Component]) => (
          Component
        ))}
      </Fragment>
    </PortalContext.Provider>
  )
}

export default PortalProvider;