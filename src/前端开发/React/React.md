### createContext

利用createContext 可以不用将组件参数一层层往下传递，虽然将createContext 和useReducer 组合在一起使用不但可以避免多层传递参数的麻烦，同时也可以实现在子组件中改变父组件的值，但是这么做也会增加代码的复杂度。对于只需要将父组件的参数传递给子组件，而没有子组件改变父组件的情况可以只使用createContext即可，从而减少了代码的复杂度。

```typescript
import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

export interface CreateContextOptions<T> {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
}

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>
];

export function createContext<T>(options: CreateContextOptions<T>) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Context = createReactContext<T | undefined>(defaultValue);
  Context.displayName = name;

  function useContext() {
    const context = useReactContext(Context);

    if (!context && strict) {
      const error = new Error(
        errorMessage ??
          `${hookName} returned \`undefined\`. Seems you forgot to wrap component within ${providerName}`
      );
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}
```

当在使用时，只需要在父组件中添加Wrapper， 并在子组件中获取到该值

```typescript
export const [AlertProvider, useAlertContext] = createContext<AlertContext>({
  name: "AlertContext",
  hookName: "useAlertContext",
  providerName: "<Alert />",
});

// Parent component
export const Alert = forwardRef<AlertProps, "div">(function Alert(props, ref) {
  
  return <AlertProvider value={{status}}>{...}</AlertProvider>;
});

export function AlertIcon(props: AlertIconProps) {
  const {status} = useAlertContext();
  
  
}
```

