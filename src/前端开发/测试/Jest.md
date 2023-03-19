## 1. 配置

Jest 配置文件（`jest.config.js`）默认是放在根目录下的，在配置文件中提供了配置项`setupFilesAfterEnv`
，它允许你Jest初始化之后和执行测试之前运行相关的代码。

```javascript
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
}
```

你可以将大量与测试相关的重复代码放到这里，从而达到简化书写测试代码的目的。

你可以将测试中重复用到的代码封装成一个个方法，并挂在到global对象中，这样在测试中就可以不用引入就可以直接使用。

```javascript
import '@testing-library/jest-dom/extend-expect';
import {screen} from '@testing-library/react';
import renderWithProviders from 'Tests/helpers';

const {getByTestId, getByText} = screen;

global.getByText = getByText;
global.getByTestId = getByTestId;
global.render = renderWithProviders;
```

**Eslint配置：** 由于eslint无法从global获取到这些对象，因此会报相关的错误。正确的做法是在eslint中配置global对象。

```json
{
  "globals": {
    "getByText": false,
    "getByTestId": false,
    "render": false
  }
}
```

**Jest 配置：** 除了需要在eslint中配置，还需要在jest配置文件中配置

```javascript
// jest.config.js
module.exports = {
    globals: {}
}
```

**修改`getByTestId`**:  默认情况下，使用`getByTestId` 查找DOM节点会去查找`data-cy`, 当然这也可以在使用时自定义test
ID，不过也可以在全局修改默认test id,

```javascript
// setupTests.js
configuration({
    testIdAttribute: 'data-test-id',
})
```

**挂载到其他对象：** 除了可以挂载到global对象上，你也可以挂载到任意其他对象上，如：`screen`、`userEvent`.
甚至通过利用`jest.mock` 挂载到任意其他对象上。

## 2. React测试

### 1.useRef

在测试环境中如果想要知道useRef是否被正确调用，需要覆盖真实的`useRef`函数

```javascript
const MeacureMe = ({onMeasure}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (wrapperRef.current) {
            onMeasure(wrapperRef.current.cleintWidth);
        }
    }, [onMeasure]);

    return <div ref={wrapperRef} style={{width: '100%'}}/>
}

// mock 
jest.mock('react', () => {
    // Require original module not to be mocked
    const originalModule = jest.requireActual('react');
    return {
        __esModule: true,
        ...originalModule,
        useRef: jest.fn().mockReturnValue({
            current: {cleintWidth: 1200},
        }),
    };
});

describe('MeasureMe', () => {
    test('should call onMeasure with the right measure', () => {
        const onMeasure = jest.fn();
        render(<MeasureMe onMeasure={onMeasure}/>);
        expect(onMeasure).toHaveBeenCalledWith(1200);
    })
})
```

## 3. DOM测试

### 1.resize

测试用户resize浏览器窗口并切换不同viewport操作。[其他示例](https://codesandbox.io/s/useviewportsize-forked-pvnc1?file=/src/use-viewport-size.test.tsx)

```javascript
import matchMediaPolyfill from 'mq-polyfill';

const mockDelay = (delay) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve('resolved');
        }, delay);
    });
};

matchMediaPolyfill(window);
window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height
    }).dispatchEvent(new this.Event("resize"));
};

describe('resize window', () => {
    const debounceDelay = 300;

    test('should return new values on window resize', async () => {
        const {rerender} = render(<Component/>)

        act(() => {
            // 切换窗口
            window.resizeTo(500, 500);
        });
        // 切换窗口大小并重新渲染页面
        rerender(<Component/>);
        // 等待300秒让窗口渲染完毕
        await mockDelay(debounceDelay);

        expect(result.current.width).toBe(500);
        expect(result.current.height).toBe(500);
    })
})
```

## 4. Mock

- `jest.fn(implementation)`: 返回一个全新没有使用过的mock function，这个function 在被调用的时候会记录很多和函数调用相关的信息
- `jest.mock(moduleName, factory, options)`: 用来mock一些模块或文件
- `jest.spyOn(object, methodName)`: 返回一个mock function，和`jest.fn`相似，但能过追踪`object[methodName]`的调用信息

### 1.Jest.fn()

定义一个mock function，主要用来断言方法（函数）是否被正确调用，而不关心函数内部的实现细节。可以提供的断言部分包括返回值，参数，是否被调用以及调用次数等。
如果`jest.fn()` 没有提供内部实现，则返回值为undefined。

```javascript
test("jest.fn 断言函数调用", () => {
    const mockFn = jest.fn();
    const result = mockFn(1, 2, 3);

    // 断言mockFn执行后返回undefined
    expect(result).toBeUndefined();

    // 断言mockFn是否被调用
    expect(mockFn).toBeCalled();

    // 断言mockFn被调用的次数
    expect(mockFn).toBeCalledTimes(1);

    // 断言mockFn传入的参数
    expect(mockFn).toBeCalledWith(1, 2, 3);
});
```

同时，`jest.fn()`也可以提供返回值，内部实现等。

```javascript
test("jest.fn 返回固定值", () => {
    const mockFn = jest.fn().mockReturnValue("default");
    // 断言mockFn的返回值为default
    expect(mockFn()).toBe("default");
});

test("jest.fn() 提供内部实现", () => {
    const mockFn = jest.fn((a, b) => a + b);
    // 提供内部实现
    expect(mockFn(1, 2)).toBe(3);
});

test("返回promise", async () => {
    const mockFn = jest.fn().mockResolvedValue("default");
    expect(await mockFn()).toBe("default");
});
```

### 2.Jest.mock()

在测试时，通常并不需要调用真实的接口，或者调用外部方法。这时利用`jest.mock()`将外部的接口或方法的调用使用mock函数覆盖掉，程序在跑测试时就不会调用真实的外部方法。

```javascript
const fetch = require('../src/fetch');
const event = require('../src/event')

// 这个mock文件的路径是相对于当前测试文件的路径
jest.mock('../src/fetch.js');

// 除了直接mock之外也可以mock返回的函数
// 例如：
jest.mock("../src/event.js", () => (props) => <modal-mock>{JSON.stringify(props)}</modal-mock>);

test('fetchPostList call was called', async () => {
  expect.assertions(1);
  const mockFn = jest.fn();
  await fetch(mockFn);

  expect(mockFn).toBeCalled();
} )

test('mock all fetch.js', async () => {
  expect.assertions(2);
  await event();
  expect(fetch()).toHaveBeenCalled();
  expect(fetch()).toHaveBeenCalledTimes(1);
})
```

### 3.Jest.spyOn()

在功能上，`jest.spyOn()`的作用和`jest.fn()` 类似，都是mock一个函数。但是不仅可以捕获函数的调用情况，还可以正常执行被mock的函数。

```javascript
import events from '../src/events';
import fetch from '../src/fetch';

test('jest.spyOn测试fetch.fetchPostList被正常调用', async () => {
    expect.assertions(2);
    const spyFn = jest.spyOn(fetch, 'fetchPostList');
    await events.getPostList();
    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledTimes(1);
})
```

## 5. Mistakes

### 1. `wrapped in act`

在编写测试时经常会遇到下面的错误：

```txt
When testing, code that causes React state updates should be wrapped into act(...):

     act(() => {
       /* fire events that update state */
     });
     /* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
```

在运行测试代码时，组件的更新或渲染都应当React的调用栈中进行的。虽然一部分方法`render`、`fireEvent` 已经经过React testing
library处理并集成在act下。但是当出现上面的错误时，依然需要手动将更新的代码使用`act`包裹。例如：

```javascript
// with render-dom/test-utils
test("should render and update a counter", () => {
    // Render a component
    act(() => {
        ReactDOM.render(<Counter/>, container);
    });
    // fire event to trigger component update
    act(() => {
        button.dispatchEvent(new MouseEvent('click', {bubble: true}));
    });
})
```

有下面四种场景经常会遇到这个错误：

> <h3>场景一：异步更新</h3>

使用异步的方式更新组件，例如：获取请求数据。

```javascript
const MyComponent = () => {
    const [person, setPerson] = useState();
    const handleFetch = useCallback(async () => {
        const {data} = await fetchData();
        setPerson(data.person); // Asynchronous upadte
    }, []);

    return (
        <button type="button" onClick={handleFetch}>
            {person ? person.name : "Fetch"}
        </button>
    );
}
```

下面是没有用`act`包裹的测试用例，并发生的错误

```javascript
test("should fetch person name", () => {
    const {getByText} = render(<MyComponent/>);
    fireEvent.click(getByText("Fetch"));
    expect(getByText("David")).toBeInTheDocument();
})
```

`fireEvent.click`会触发`fetchData`这个异步方法被调用，当有结果返回时会调用`setPerson`，同时会更新这个组件，但是组件的更新是在React的调用栈之外发生的。

方法：在断言之前，利用`waitFor`等待组件完全更新。

`waitFor`是React testing library提供的方法，作用是在一定的时间窗口内等待断言通过。

```javascript
test("should fetch person name", async () => {
    const {getByText} = render(<MyComponent/>);
    fireEvent.click(getByText("Fetch"));

    await waitFor(() => {
        expect(getByText("David")).toBeInTheDocument();
    })
})
```

> <h3>场景二：Jest Faker Timers</h3>

当在组件中使用了`setTimeout`、`setInterval`，同时在测试用使用Jest mock 它们， 如果没有使用`act` 同样会报这个错。

```javascript
// component
const Toast = () => {
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    }, [])
}

// test
test("should display Toast in 1 sec", () => {
    jest.useFakeTimers();
    const {queryByText} = render(<Toast/>);
    jest.advanceTimerByTime(1000);

    expect(queryByText("Toast!")).not.toBeInTheDocument();
})
```

因为测试用例无法知道`advanceTimerByTime`会导致组件更新，所以会报这个错误。

**方法：** 将`advanceTimerByTime`放在`act`中，就可以解决这个问题

```javascript
test("should display Toast in 1 sec", () => {
    jest.useFakeTimers();
    const {queryByText} = render(<Toast/>);
    act(() => {
        jest.advanceTimerByTime(1000);
    });

    expect(queryByText("Toast")).not.toBeInTheDocument();
})
```

> <h3>场景三：premature exit</h3>

在组件完成渲染或更新之前退出了整个测试，同样会报错误。例如：在发送请求之前显示Loading状态，获取数据之后需要更新组件，会报这个错误。

```javascript
// component
const MyComponent = () => {
    const {loading, data} = useFetchData();

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>{data.accounts.length}</div>
    );
}

// test
test("should display loading state", () => {
    const {getByText} = render(<MyComponent/>);
    expect(getByText("Loading...")).toBeInTheDocument();
})
```

测试用例在加载状态消失和返回数据之前退出了，这样也会导致`not wrapped in act` 的错误。

**方法：** 确保测试用例在组件完全渲染或更新完毕之后退出。

```javascript
test("should display loading state", async () => {
    const {getByText, queryByText} = render(<MyComponent/>);
    expect(getByText("Loading...")).toBeInTheDocument();

    // 使用waitFor等待
    await waitFor(() => {
        expect(queryByText("Loading ...")).not.toBeInTheDocument();
    });
    // 使用waitForElementToBeRemoved
    await waitForElementToBeRemoved(() => queryByText("Loading..."));
})
```