**在React中相对于 Hooks，使用Class组件的优势。**

1.  Class组件拥有更多的钩子函数，可以对组件的生命周期做更加精细的控制，减少重复渲染的次数
2. 可以通过继承的方式重载父组件，这在引入外部组件时会非常有用。当外部组件不能满足需要，可以通过重载添加或修改改变原有的功能
3. 可以利用Ref 获取Class组件中的方法。在Class组件中，ref相当于该组件的引用

```javascript
class Parent extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  
  componentDidMount() {
    this.ref.current.func();
  }
  
  render() {
    <Child
    	ref={this.ref}
    />
  }
}
```

