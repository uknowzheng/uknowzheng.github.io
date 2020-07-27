---
title: "前端Js的设计模式和重构方法"
date: "2020-07-26T03:32:50.000Z"
slug: "xyhxxs"
---
<a name="8e1b944f"></a>
### 背景

<br />为什么突然想写前端编码中的设计模式呢？国庆期间自己思考了下设计模式在日常开发中的用法以及代码重构的技巧。于是乎整理了下这篇文章跟大家分享下前端这块的设计模式以及一些代码重构的思路。设计模式的玄学还是得在很多个项目中去实战总结思考才能领悟到。<br />

<a name="301a1997"></a>
### 设计模式

<br />设计模式是大家日常开发中面向对象比较长谈的代码结构的设计方式，主要规范了我们平时开发过程中的代码设计原则，这里列举下比较重要的几个原则：<br />

- 开闭原则(OCP)：对于组件功能的扩展是开放的,对于原有代码的修改是封闭的。
- 单一职责原则(SRP)：一个类只负责一项职责。
- 里氏替换原则(LSP)：子类可以扩展父类的功能，但不能改变父类原有的功能。
- 依赖倒置原则(DIP)：面向接口编程，不针对实现编程。
- 接口隔离原则(ISP)：每一个接口都应该承担相对独立的角色。
- 最少知识原则(LoD)：降低系统耦合，使类与类之间的结构松散。


<br />正常看了这么多原则，没写过大量业务项目代码的话，真的是比较难理解这些思想，当然作为从Java转到Javascript这块坑的我最大的感受是从约束很严格的语言转到一门非常灵活的语言上。但是设计模式的思想还是通用的，依旧能够借助其思想去解决业务设计上的一些问题。<br />

<a name="ba23997d"></a>
#### 常见的设计模式

<br />一般常见的设计模式有如下24中类：

| 创建型 | 结构型 | 行为型 |
| --- | --- | --- |
| 单例模式 | 代理模式 | 迭代器模式 |
| 抽象工厂模式 | 组合模式 | 模版方法模式 |
| 简单工厂模式 | 适配器模式 | 访问者模式 |
| 工厂方法模式 | 桥接模式 | 解释器模式 |
| 构建器模式 | 装饰器模式 | 责任链模式 |
| 原型模式 | 外观模式 | 备案录模式 |
|  | 享元模式 | 中介者模式 |
|  |  | 状态模式 |
|  |  | 观察者模式 |
|  |  | 命令模式 |
|  |  | 策略模式 |


<br />下面我会用ES6来编写这几种设计模式：<br />

<a name="d7b229c4"></a>
#### 创建型模式


<a name="fb7a820b"></a>
##### 单例模式模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048572328-03c3cb5e-0e65-48f9-af1c-90711864af9b.png#align=left&display=inline&height=172&margin=%5Bobject%20Object%5D&originHeight=172&originWidth=387&status=done&style=none&width=387)<br />

```
class Singleton {
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    
    method(){
        console.log("hello world!");
    }
}

let obj = Singleton.getInstance();
```


<a name="b41b9f61"></a>
##### 简单工厂模式


```
class Car {
    constructor(options) {
        options = options || "";
        this.doors = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "silver";
    }
}

class CarFactory {
    createCar(options) {
        return new Car(options);
    }
}

const carFactory = new CarFactory();
const car = carFactory.createCar({
    objType: "car",
    color: "yellow",
    doors: 4
});
```


<a name="0b9151cb"></a>
##### 工厂方法模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048542931-7bf6f2d5-2fa6-4822-acea-0495efb1952a.png#align=left&display=inline&height=189&margin=%5Bobject%20Object%5D&originHeight=189&originWidth=580&status=done&style=none&width=580)<br />

```
class Car {
    constructor(options) {
        this.doors = options.doors || 4;
        this.state = options.state || "brand new";
        this.color = options.color || "silver";
    }
}

class BigCar extends Car {
    constructor(options) {
        super(options);
    }
}

class SmallCar extends Car {
    constructor(options) {
        super(options);
    }
}

class ObjectFactory {
    constructor(Class) {
        this.objClass = Class;
    }
    createObj(options) {
        return new this.objClass(options);
    }
}

class BigCarFactory extends ObjectFactory{
    constructor() {
        super(BigCar);
    }
}

class SmallCarFactory extends ObjectFactory{
    constructor() {
        super(SmallCar);
    }
}

//usage 
const bigCarFactory = new BigCarFactory();
const bigCarObj = bigCarFactory.createObj({
    color: "yellow",
    doors: 6
});

const smallCarFactory = new SmallCarFactory();
const smallCarObj = smallCarFactory.createObj({
    color: "blue",
    doors: 4
});
```


<a name="630a0087"></a>
##### 抽象工厂模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048473433-f364ae3d-9c0b-44b1-acec-792c674eb4d1.png#align=left&display=inline&height=393&margin=%5Bobject%20Object%5D&originHeight=393&originWidth=857&status=done&style=none&width=857)<br />

```
class Car {}
class BigCar extends Car{}
class SmallCar extends Car{}
class Bike {}
class BigBike extends Bike{}
class SmallBike extends Bike{}

class Factory {
    getCar(){
    	throw new Error('子类实现')
    }
    
     getBike(){
    	throw new Error('子类实现')
    }
}

class BigFactory extends Factory {
    getCar(){
    	return new BigCar();
    }
    
    getBike(){
    	return new BigBike();
    }
}

class SmallFactory extends Factory {
    getCar(){
    	return new SmallCar();
    }
    
    getBike(){
    	return new SmallBike();
    }
}

//usage 
const bigFactory = new BigFactory();
const bigcar = bigFactory.getCar();
const bigbike = bigFactory.getBike();

const smallFactory = new SmallFactory();
const smallcar = smallFactory.getCar();
const smallbike = smallFactory.getBike();
```


<a name="f48e3b1e"></a>
##### 构建器模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048501573-370262f9-bca6-4c12-b1c8-f250dec9eada.png#align=left&display=inline&height=288&margin=%5Bobject%20Object%5D&originHeight=288&originWidth=480&status=done&style=none&width=480)<br />

```
class CarBuilder {
  constructor() {
    this.engine = '';
    this.tyre = '';
    this.logo = '';
    Object.keys(this).forEach(key => {
    	//把每个属性名第一个字母大写并拼入set,构成setXXX
      const setFuncName =  `set${key.substring(0,1).toUpperCase()}${key.substring(1)}`;
      this[setFuncName] = value => {
        this[key] = value;
        return this;
      }
    })
  }
  
  //调用建造者
  build() {
    //取出所有属性非方法
    const keysNoFunc = Object.keys(this).filter(key => typeof this[key] !== 'function');
    return keysNoWithers.reduce((returnValue, key) => {
      return {
        ...returnValue,
        [key]: this[key]
      }
    }, {});
  }
}

const car = new CarBuilder()
  .setEngine("牛逼哄哄的引擎")
  .setTyre(4)
  .setLogo('蓝博基泥')
  .build();
console.log(car)
```


<a name="ec3c9c8f"></a>
##### 原型模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540049097505-a07e217d-b467-4667-8460-36a2ceeb9acd.png#align=left&display=inline&height=276&margin=%5Bobject%20Object%5D&originHeight=276&originWidth=519&status=done&style=none&width=519)<br />

```
class Person{
  constructor(name) {
    this.name = name;
  }
   
   clone(){
      var that = Object.create(this.prototype);
      var other = this.apply(that, arguments);
      return (typeof other === 'object' && other) ? other : that;
   }
}

let tom = new Person('tom');
let jerry = tom.clone('jerry');
```


<a name="f203704d"></a>
#### 结构型模式


<a name="eb1dfda7"></a>
##### 代理模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048633796-15202e70-57e2-4055-9539-c0ba901d3c90.png#align=left&display=inline&height=242&margin=%5Bobject%20Object%5D&originHeight=242&originWidth=580&status=done&style=none&width=580)<br />

```
class Master {
  doSomething(args) {
    console.log('Master do something...' + args.name);
  }
}

class Proxy extends Master {
  constructor() {
    super();
  }

  doSomething(args) {
    //do some other thing
    console.log('proxy do something')
    args.name = 'hello';
    //master do something
    super.doSomething(args)
  }
}

const proxy = new Proxy();
proxy.doSomething();
```


<a name="e546bc3d"></a>
##### 组合模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048839546-314def10-f9bd-4851-b311-05929103ccdd.png#align=left&display=inline&height=362&margin=%5Bobject%20Object%5D&originHeight=362&originWidth=639&status=done&style=none&width=639)<br />

```
class Component {
    constructor() {}
    operation (){}
    add (Component){}
    remove (Component){}
    getChild (key){}
}

class Leaf extends Component {
    constructor(name) {
        super()
        this.name = name
    }
    operation (){}
}

class Composite extends Component {
    constructor(name) {
        super()
        this.name = name
        this.children = []
        facade.log('Composite created')
    }

    operation (){
        for(var i in this.children)
            this.children[i].Operation()
    }

    add (Component){
        this.children.push(Component)
    }

    remove (Component){
        for(var i in this.children)
            if(this.children[i] === Component)
                this.children.splice(i, 1)
    }

    getChild (key){
        return this.children[key]
    }
}


const composite1 = new Composite('C1')
composite1.Add(new Leaf('L1'))
composite1.Add(new Leaf('L2'))
const composite2 = new Composite('C2')
composite2.Add(composite1)
composite1.GetChild(1).Operation()
composite2.Operation()
```


<a name="0afd573a"></a>
##### 适配器模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048928458-6456fd90-22fa-47f3-b45a-79b057c311f8.png#align=left&display=inline&height=277&margin=%5Bobject%20Object%5D&originHeight=277&originWidth=566&status=done&style=none&width=566)<br />

```
class MediaPlayerInterface{
    play(audioType,fileName){
        throw "播放方法,由子类实现"
    }
}

class VlcPlayer{
    playVlc(fileName){
        console.log(`我是Vlc播放器文件名称是${fileName}`)
    }
    playMp4(fileName){}
}

class Mp4Player{
    playMp4(fileName){
        console.log(`我是Mp4播放器文件名称是${fileName}`)
    }
}

class MediaPlayer extends MediaPlayerInterface{
    play(audioType,fileName){
        if(audioType=="vlc")new VlcPlayer().playVlc(fileName);
        if(audioType=="mp4")new Mp4Player().playMp4(fileName);
    }
}

class Mp3Player{
    playMp3(fileName){
        console.log(`我是Mp3播放器文件名称是${fileName}`)
    }
}

class AudioPlayerAdapter extends MediaPlayerInterface{
    constructor(mediaPlayer) {
        super()
        this.mediaPlayer = mediaPlayer;
    }
    play(audioType,fileName){
      if(audioType==="mp3"){
          new Mp3Player().playMp3(fileName);
      }else{
          this.mediaPlayer.play(audioType,fileName);
      }
    }
}

const mediaPlayer = new MediaPlayer()
audioPlayer.play("mp4", "alone.mp4");
audioPlayer.play("vlc", "far far away.vlc");
//某天要新增mp3播放器，那么只需要套一层适配器
var audioPlayer = new AudioPlayerAdapter(mediaPlayer);
audioPlayer.play("mp3", "beyond the horizon.mp3");
```


<a name="ef6b370c"></a>
##### 外观模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048810903-904f8cb4-84cf-427c-9438-107db7cb27ed.png#align=left&display=inline&height=300&margin=%5Bobject%20Object%5D&originHeight=300&originWidth=564&status=done&style=none&width=564)<br />

```
class Facade {
    _getUserName() {
        console.log("current user:" + this.name);
    }
    _setUserName(name) {
        this.name = name;
    }
    _run() {
        console.log("running");
    }
    _jump() {
        console.log("jumping");
    }

    facade(args) {
    	let {run,name,jump} = args;
        this._setUserName(name);
        this._getUserName();
        if (run) {
            this._run();
        }
        if (jump) {
            this._jump();
        }
    }
}
let facadeObj = new Facade();
facadeObj.facade({ run: true, jump: true ,name:'uk' });
```


<a name="baa7db90"></a>
##### 装饰器模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048819742-4877b75a-26b5-4a3c-ac35-aa612c1e1135.png#align=left&display=inline&height=364&margin=%5Bobject%20Object%5D&originHeight=364&originWidth=579&status=done&style=none&width=579)<br />

```
class MacBook {
    cost() {
        return 997;
    }
}

function Memory(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 75;
    };
    return macbook;
}

function Engraving(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 200;
    };
    return macbook;
}

function Insurance(macbook) {
    let v = macbook.cost();
    macbook.cost = function() {
        return v + 250;
    };
    return macbook;
}

let mb = new MacBook();
mb = Memory(mb);//加内存
mb = Engraving(mb);//加刻字
mb = Insurance(mb);//加保险
console.log(mb.cost());// 总计: 1522
```


<a name="e7c0c21d"></a>
##### 桥接模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048856475-d005e6f6-df6a-4f8a-a86e-3f91d17cd68b.png#align=left&display=inline&height=309&margin=%5Bobject%20Object%5D&originHeight=309&originWidth=628&status=done&style=none&width=628)<br />

```
class DrawAPI {
   drawCircle(radius,x, y){
    throw "抽象方法"
   }
}

class RedCircle extends DrawAPI {
    drawCircle( radius,  x,  y) {
     console.log("Drawing Circle[ color: red, radius: " + radius + ", x: " + x + ", " + y + "]");
    }
}
class GreenCircle extends DrawAPI {
    drawCircle( radius,  x,  y) {
      console.log("Drawing Circle[ color: green, radius: " + radius + ", x: " + x + ", " + y + "]");
    }
}
  
class Shape {
    constructor(drawAPI) {
        this.drawAPI = drawAPI;
    }
    draw(){
         this.drawAPI.drawCircle(this.x,this.y,this.radius)
    }
}

class Circle extends Shape{
    constructor(x, y, radius, drawAPI){
        super(drawAPI);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
//将实际Circle渲染的实现与Circle定义进行分离
const redCircle = new Circle(100,1000, 10, new RedCircle());//画红圆
const greenCircle = new Circle(100,100, 10, new GreenCircle());//画绿圆
redCircle.draw();
greenCircle.draw();
```


<a name="3c737b3f"></a>
##### 享元模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540049044757-3e63a749-5349-4a81-8e52-dd3b94c1cc0e.png#align=left&display=inline&height=411&margin=%5Bobject%20Object%5D&originHeight=411&originWidth=683&status=done&style=none&width=683)<br />

```
class Flyweight {
    constructor(make, model, processor){
      this.make = make;
      this.model = model;
      this.processor = processor;
    }
};
 
class FlyWeightFactory {
    constructor(){
      flyweights = {};
    }
    get(make, model, processor) {
      if (!flyweights[make + model]) {
          flyweights[make + model] = new Flyweight(make, model, processor);
      }
      return flyweights[make + model];
    }
    
    getCount() {
      let count = 0;
      for (let f in flyweights) count++;
      return count;
    }
};
 
 class Computer {
   constructor (make, model, processor, memory, tag){
      this.flyweight = FlyWeightFactory.get(make, model, processor);
      this.memory = memory;
      this.tag = tag;
   }
}
 
class ComputerCollection {
   constructor(){
      var computers = {};
      var count = 0;
   }
 
   add(make, model, processor, memory, tag){
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
   }
 
    get(tag){
      return computers[tag];
    }
 
    getCount() {
      return count;
    }
}
 
var computers = new ComputerCollection();
computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
computers.add("HP", "Envy", "Intel", "2G", "TXU003283");
console.log("Computers: " + computers.getCount());
//count = 7;
console.log("Flyweights: " + FlyWeightFactory.getCount());
//count = 2; 这里把品牌/型号/处理器都抽成共享单元了
//[("Dell", "Studio XPS", "Intel"),("HP", "Envy", "Intel")]
```


<a name="0df886f3"></a>
#### 行为型模式


<a name="7f10b11f"></a>
##### 策略模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048612724-086d8064-c162-43e1-8781-53a705c52969.png#align=left&display=inline&height=205&margin=%5Bobject%20Object%5D&originHeight=205&originWidth=551&status=done&style=none&width=551)<br />

```
class Checker {
  constructor(check, instructions) {
     this.check = check;
     this.instructions = instructions;
  }
}

class Validator {
  constructor(config) {
    this.config = config,
    this.messages = {};
  }

  validate(data) {
    for (let key in data) {
      let value = data[key];
      let type = this.config[key];
      if (!type) {
      	continue;
      }
      let checker = Validator[type];
      if (!checker) {
      	throw new Error(`No handler to validate type ${type}`);
      }
      let result = checker.check(value);
      if (!result) {
      	this.messages.push(checker.instructions + ` **${value}**`);
      }
    }
  }

  hasError() {
    return this.messages.length !== 0;
  }
}

let data = {
   first_name:'Super',
   last_name:'Man',
   age:'unknown',
   username:'uk'
};
let config = {
  first_name:'isNonEmpty',
  age:'isNumber',
  username:'isAlphaNum'
};

Validator.isNumber = new Checker((val) => !isNaN(val), 'the value can only be a valid number');
Validator.isNonEmpty = new Checker((val) => val !== "", 'the value can not be empty');
Validator.isAlphaNum = new Checker((val) => !/^a-z0-9/i.test(val), 'the value can not have special symbols');

let validator = new Validator(config);
validator.validate(data);
console.log(validator.hasError());// true
console.log(validator.messages.join('\n')); // the value can only be a valid number **unknown**
```


<a name="de2a2941"></a>
##### 迭代器模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048677832-ba96921d-fdc6-4980-9b1b-d7a42e802cc9.png#align=left&display=inline&height=348&margin=%5Bobject%20Object%5D&originHeight=348&originWidth=548&status=done&style=none&width=548)<br />

```

class IteratorArray {
  constructor(array) {
    super();
    this.data = array;
  }
  
  [Symbol.iterator](){
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
       	    return {
            	value: this.data[index++],
                done: false
            };
        }
        return {
             value: undefined,
             done: true
        };
      },
      hasNext: () => index < this.data.length,
      rewind: () => index = 0,
      current: () => {
        index -= 1;
        if (index < this.data.length) {
            return {
            	value: this.data[index++],
                done: false
            };
        }
        return {
        	value: undefined,
            	done: true};
      	}
    }
  }
}

const iteratorArray = new IteratorArray([1,2,3,4,5])
const iter = iteratorArray[Symbol.iterator]();
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 2, done: false }
console.log(iter.current());// { value: 2, done: false }
console.log(iter.hasNext());// true
console.log(iter.rewind()); // rewind!
console.log(iter.next()); // { value: 1, done: false }

// for...of
for (let value of iteratorArray) {
  console.log(value);
}
```


<a name="ed69b1eb"></a>
##### 观察者模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048699317-529aa40a-07f2-4e7b-8bd4-99f1b847e038.png#align=left&display=inline&height=325&margin=%5Bobject%20Object%5D&originHeight=325&originWidth=733&status=done&style=none&width=733)<br />

```
class Pubsub {
    constructor(){
        this.topics = {};
    }
    publish(name, args) {
        if (!this.topics[name]) {
            return false;
        }
		for(let key in this.topics[name]){
        	const callback = this.topics[name];
            callback(args);
        }
    }

    subscribe(name, callback) {
        if (!this.topics[name]) {
            this.topics[name] = [];
        }
        this.topics[name].push(callback);
    }
    
    unsubscribe(name,callback) {
         if (!this.topics[name]) {
            return false;
         }
         this.topics[name].remove(callback);
    }
}


let obj = {
   callback:(message)=>{
    	console.log(message);
    }
}
let pubsub = new Pubsub();
pubsub.subscribe("subscribe", obj.callback);
pubsub.publish("subscribe", "hello all!");
//obj console hello all!
```


<a name="a5c7aeff"></a>
##### 命令模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540049061395-6d28c48b-becf-4cf7-852a-3d96973c9252.png#align=left&display=inline&height=253&margin=%5Bobject%20Object%5D&originHeight=253&originWidth=666&status=done&style=none&width=666)<br />

```
class Command {
 	constructor(do,undo){
        this.do = do;
        this.undo = undo;
    }
    execute(){
        this.do();
    }
    
    undo(){
      this.undo();
    }
}

class Commands {
    constructor(){
        this.commandsList = [];
    }
    
    add( command ){
	this.commandsList.push( command );
    }
    
    execute(){
      for (const command of this.commandsList){
        command.execute();
      }
    }
    
    undo(){
      for (const command of this.commandsList){
        command.undo();
      }
    }
}

 let sleepCommond = new Command(()=>{
 	console.log('sleep')
 },()=>{
 	console.log('wake up');
 });
 
  let runCommond = new Command(()=>{
 	console.log('run')
 },()=>{
 	console.log('back');
 });

const commands = Commands();
commands.add( sleepCommond );
commands.add( runCommond );
commands.execute();
commands.undo();
```


<a name="7b687d57"></a>
##### 模版方法模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048744748-6832399d-7cb4-4743-9160-0f6e71875094.png#align=left&display=inline&height=276&margin=%5Bobject%20Object%5D&originHeight=276&originWidth=425&status=done&style=none&width=425)<br />

```
class Beverage {
	boilWater(){
 	  console.log( "煮一壶水" );
	}
	brew(){
	  throw new Error('具体由子类实现');
	}
	pourInCup(){
	  throw new Error('具体由子类实现');
	}
	addCondiments(){
	  throw new Error('具体由子类实现');
	}
    go(){
    	boilWater();
        brew();
        pourInCup();
        addCondiments();
    }
}

class Coffee extends Beverage{
	brew() {
	  console.log( "用沸水冲泡咖啡" );
	}
	pourInCup(){
 	  console.log( "把咖啡倒进杯子" );
	}
	addCondiments() {
	  console.log( "加糖和牛奶" );
	}
}

class Tea extends Beverage{
	brew() {
	  console.log( "用沸水浸泡茶叶" );
	}
	pourInCup(){
 	  console.log( "把茶倒进杯子" );
	}
	addCondiments() {
	  console.log( "加柠檬" );
	}
}

const coffee = new Coffee();
const tea = new Tea();
coffee.go();
tea.go();
```


<a name="c0e35df8"></a>
##### 责任链模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540049020766-6cad3dc4-cfd5-4846-b695-1a1c90582b5b.png#align=left&display=inline&height=285&margin=%5Bobject%20Object%5D&originHeight=285&originWidth=407&status=done&style=none&width=407)<br />

```

let order500 = function( orderType, pay, stock ){
  if ( orderType === 1 && pay === true ){
    console.log( '500 元定金预购，得到100 优惠券' );
  }else{
    return 'next'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let order200 = function( orderType, pay, stock ){
  if ( orderType === 2 && pay === true ){
    console.log( '200 元定金预购，得到50 优惠券' );
  } else {
    return 'next'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let orderNormal = function( orderType, pay, stock ){
  if ( stock > 0 ){
    console.log( '普通购买，无优惠券' );
  }else{
    console.log( '手机库存不足' );
  }
};

class Chain {
	constructor(){
  	  this.fn = fn;
	  this.nextFunc = null;
	}
	setNextFunc( nextFunc ){
	  return this.nextFunc = nextFunc;
	}
	run() {
		var result = this.fn.apply( this, arguments );
		if ( result === 'next' ){
			return this.nextFunc && this.nextFunc.run.apply( this.nextFunc, arguments);
		}
		return result;
	}
}

var chainOrder500 = new Chain( order500 );
var chainOrder200 = new Chain( order200 );
var chainOrderNormal = new Chain( orderNormal );
//构造处理链路
chainOrder500.setNextFunc( chainOrder200 );
chainOrder200.setNextFunc( chainOrderNormal );

chainOrder500.run( 1, true, 500 ); // 输出：500 元定金预购，得到100 优惠券
chainOrder500.run( 2, true, 500 ); // 输出：200 元定金预购，得到50 优惠券
chainOrder500.run( 3, true, 500 ); // 输出：普通购买，无优惠券
chainOrder500.run( 1, false, 0 ); // 输出：手机库存不足
```


<a name="46991287"></a>
##### 中介者模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048791779-f31ba263-9035-4cea-ae5a-d4a39d5271da.png#align=left&display=inline&height=205&margin=%5Bobject%20Object%5D&originHeight=205&originWidth=541&status=done&style=none&width=541)<br />

```
 class ChatRoom {
     constructor () {}
     
     showMessage (message) {
         console.log(new Date(), user.getName(), message)
     }
 }
 
 class User {
     constructor (name){
         this.name = name
     }
     setName () {
         this.name = name
     }
     getName() {
        return this.name
     }
     setRoom(room){
     	this.room = room; 
     }
     sendMessage (message) {
        room.showMessage(this, message)
     }
 }
 
 //chatRoom将tom跟jack解耦
const chatRoom = ChatRoom();

const tom = new User("Tom Zhang");
tom.setRoom(chatRoom);
tom.sendMessage("My name is Tom");
     
const jack = new User("Jack Chen");
jack.setRoom(chatRoom);
jack.sendMessage("My name is Jack");
```


<a name="5ba313f4"></a>
##### 状态模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048724295-88af7493-26de-4762-b4bf-ace6455d5059.png#align=left&display=inline&height=213&margin=%5Bobject%20Object%5D&originHeight=213&originWidth=568&status=done&style=none&width=568)<br />

```
class Context {
    constructor () {
        this.state = null
    }
    
    setState(state) {
        this.state = state
    }
    
    getState() {
        return this.state
    }
    
}

class State {
    doAction(context) {
         throw new Error('具体子类去实现状态')
    }
}

class StartState extends State {
    constructor () {
        super()
        this.context = null
    }
    
    doAction(context) {
        console.log('this is start state');
        context.setState(this)
    }
    
    printState() {
         console.log('start state')
    }
}

class StopState extends State {
    constructor() {
        super()
        this.context = null
    }
    
    doAction(context) {
        console.log('this is stop state');
        context.setState(this)
    }
    
    printState() {
         console.log('stop state')
    }
}

class LoadingState extends State {
    constructor() {
        super()
        this.context = null
    }
    
    doAction(context) {
        console.log('this is loading state');
        context.setState(this)
    }
    
    printState() {
         console.log('loading state')
    }
}

const context = new Context()
let startState = new StartState()
startState.doAction(context)
context.getState().toStateStr()
    
let stopState = new StopState()
stopState.doAction(context)
context.getState().toStateStr()
    
let loadingState = new LoadingState()
loadingState.doAction(context)
context.getState().toStateStr()
```


<a name="2ffc18d4"></a>
##### 访问者模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048760442-628281c3-baab-450d-ac03-b6c650589fe7.png#align=left&display=inline&height=515&margin=%5Bobject%20Object%5D&originHeight=515&originWidth=749&status=done&style=none&width=749)<br />

```
class Visitor {
   visit(target) {
     console.log(`正在查${target.name}的水表`);
   }
}

class User{
    constructor(name) {
        this.name = name || "";
    }
    accept(visitor) {
    	visitor.visit(this);
    }
}

let user = new User('yaoxian');
var visitor = new Visitor();
user.accept( visitor );//正在查yaoxian的水表
```


<a name="a5f18f3c"></a>
##### 解释器模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048663064-d828aec7-e0e0-42ab-8a90-3b7864085b6c.png#align=left&display=inline&height=337&margin=%5Bobject%20Object%5D&originHeight=337&originWidth=517&status=done&style=none&width=517)<br />

```
class Context{
   constructor(input) {
      this.input = input;
      this.output = 0;
   }
    
    startsWith(str) {
        return this.input.substr(0, str.length) === str;
    }
}
 
class Expression{
    constructor(name, one, four, five, nine, multiplier) {
        this.name = name;
        this.one = one;
        this.four = four;
        this.five = five;
        this.nine = nine;
        this.multiplier = multiplier;
    }
    
    interpret(context) {
        if (context.input.length == 0) {
            return;
        }
        else if (context.startsWith(this.nine)) {
            context.output += (9 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.four)) {
            context.output += (4 * this.multiplier);
            context.input = context.input.substr(2);
        }
        else if (context.startsWith(this.five)) {
            context.output += (5 * this.multiplier);
            context.input = context.input.substr(1);
        }
        while (context.startsWith(this.one)) {
            context.output += (1 * this.multiplier);
            context.input = context.input.substr(1);
        }
    }
}


const roman = "MCMXXVIII"
const context = new Context(roman);
const tree = [];
tree.push(new Expression("thousand", "M", " " , " ", " " , 1000));
tree.push(new Expression("hundred", "C", "CD", "D", "CM", 100));
tree.push(new Expression("ten", "X", "XL", "L", "XC", 10));
tree.push(new Expression("one", "I", "IV", "V", "IX", 1));
for (var i = 0, len = tree.length; i < len; i++) {
  tree[i].interpret(context);
}

alert(roman + " = " + context.output);
```


<a name="d22030b5"></a>
##### 备案录模式

<br />![](https://cdn.nlark.com/lark/0/2018/png/109645/1540048957948-75b2e902-8f79-45ec-9e96-eef2058839dd.png#align=left&display=inline&height=220&margin=%5Bobject%20Object%5D&originHeight=220&originWidth=660&status=done&style=none&width=660)<br />

```
class CacheUtil {
   constructor() {
      this.cache = {};
   }
      
   requestData(url,callback){
       if (cache[url]){
          data = cache[url];
          callback(data);
      }else{
          //模拟网络请求
       	  setTimeout(()=>{
                cache[url] = data;
                callback(data);
          },3000);   
      }
   }
}

let cache = new CacheUtil();
cache.requestData('www.baidu.com',(data)=>{console.log(data)});//请求
cache.requestData('www.baidu.com',(data)=>{console.log(data)});//从备忘录中获取
```

<br />关于更多详细的设计模式说明可以到[《javascript pattern》](https://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript)去查阅。<br />

<a name="318ab8ae"></a>
#### 思考总结

<br />针对上述的一些设计模式，对其解决问题场景提炼出思考总结。

| 具体设计模式 | 解决的问题 |
| --- | --- |
| 单例模式 | 保证唯一性 |
| 策略模式 | 多种策略方案实现结果 |
| 代理模式 | 对目标对象做前置处理（一般只有一层代理包装），并执行 |
| 迭代器模式 | 迭代执行与处理分离 |
| 观察者模式（发布订阅模式） | 解耦发布者与订阅者之间的关系 |
| 命令模式 | 记录回溯哦操作，包装操作行为 |
| 组合模式 | 合理组织树形结构 |
| 模版方法模式 | 定义操作的流程，实现交由各个子类去实现 |
| 享元模式 | 明确内外变化，把静态部分单独抽成对象，共享于依赖的多个对象 |
| 责任链模式 | 根据各自的职责，链式处理 |
| 中介者模式 | 解耦多个对象之间的关系，由中间人处理 |
| 适配器模式 | 保持接口原则不变，对新进来的接口进行适配包装掉用 |
| 状态模式 | 状态流转，维护状态机 |
| 工厂模式 | 管理对象创建 |
| 外观模式 | 收口对外暴露的接口 |
| 装饰器模式 | 类似代理，但是可以多重包装目标对象，并不执行具体逻辑，仅仅包装 |
| 备案录模式 | 缓存数据，历史可回溯 |
| 访问者模式 | 允许外部权限访问内部数据 |



<a name="6eea4caa"></a>
#### 设计模式中相似模式的一些思考


<a name="f863b78c"></a>
##### 中介者模式和观察者模式

<br />中介者解决的问题是将多个角色进行解耦，过程中会把所有角色交互都收敛到中介角色中，使得各个角色只需要跟中介者通讯。而对于观察者模式，日常中用的比较多的就是发布订阅模式，主要是将订阅者将事件注册到发布者上，一旦发布者发布信息就可以通知到所有的订阅者上，并没有存在中间人去解耦发布者跟订阅者之间的关系。<br />

<a name="96ec9a47"></a>
##### 代理模式和装饰器模式

<br />代理模式跟装饰器模式都是对目标对象进行包装，但是有比较本质的区别。代理模式一般调用引起目标角色的调用，而装饰器模式仅仅是对目标角色进行包装返回而不会直接触发目标调用。另外代理往往是对目标角色包装一层，而对于装饰器可以不断的嵌套目标角色返回包装后的目标角色。<br />

<a name="ad2018de"></a>
##### 状态模式和策略模式

<br />状态模式和策略模式都封装了一系列算法或者行为，类图看上去很相似，但是意图不同。策略模式的各种策略是相互独立平等的，没有内部联系。而对于状态模式往往维护一个状态机，各个状态之间存在依赖关系。<br />

<a name="32c203bc"></a>
### 重构技巧

<br />另外过程中也总结了日常写代码中，要注意的一些点以及如何重构自己写得不太好的代码。<br />

<a name="393182e2"></a>
#### 提炼函数

<br />如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另外一个独立的函数<br />中。这样做的好处：避免出现超大函数，独立出来的函数有助于代码复用/覆写/逻辑清晰<br />

```
//bad case
var getUserInfo = function(){
  ajax( 'http:// xxx.com/userInfo', function( data ){
    console.log( 'userId: ' + data.userId );
    console.log( 'userName: ' + data.userName );
    console.log( 'nickName: ' + data.nickName );
  });
};
```

<br />改成：<br />

```
//good case
var getUserInfo = function(){
  ajax( 'http:// xxx.com/userInfo', function( data ){
  	printDetails( data );
  });
};
var printDetails = function( data ){
  console.log( 'userId: ' + data.userId );
  console.log( 'userName: ' + data.userName );
  console.log( 'nickName: ' + data.nickName );
};
```


<a name="02b74ce9"></a>
#### 合并重复条件片段

<br />如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复的代码，<br />那么就有必要进行合并去重工作。<br />

```
//bad case
var paging = function( currPage ){
  if ( currPage <= 0 ){
    currPage = 0;
    jump( currPage ); // 跳转
  }else if ( currPage >= totalPage ){
    currPage = totalPage;
    jump( currPage ); // 跳转
  }else{
    jump( currPage ); // 跳转
  }
};
```

<br />改成<br />

```
//good case
var paging = function( currPage ){
  if ( currPage <= 0 ){
  	currPage = 0;
  }else if ( currPage >= totalPage ){
  	currPage = totalPage;
  }
  jump( currPage ); // 把jump 函数独立出来
};
```


<a name="3fa844d8"></a>
#### 把条件分支语句提炼出函数

<br />复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致<br />一个庞大的函数,把逻辑判断代码提炼成一个单独的函数，既能更准确地表达代码的意思，<br />函数名本身又能起到注释的作用。<br />

```
//bad case
var getPrice = function( price ){
	var date = new Date();
	if ( date.getMonth() >= 6 && date.getMonth() <= 9 ){ // 夏天
		return price * 0.8;
	}	
	return price;
};
```

<br />改成:<br />

```
//good case
var isSummer = function(){
    var date = new Date();
    return date.getMonth() >= 6 && date.getMonth() <= 9;
};

var getPrice = function( price ){
  if ( isSummer() ){ // 夏天
  	return price * 0.8;
  }
  return price;
};
```


<a name="ab32cd13"></a>
#### 合理使用循环

<br />在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以<br />完成同样的功能，还可以使代码量更少。<br />

```
//bad case
var createXHR = function(){
  var xhr;
  try{
    xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' );
  }catch(e){
    try{
      xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' );
    }catch(e){
      xhr = new ActiveXObject( 'MSXML2.XMLHttp' );
    }
  }
  return xhr;
};
var xhr = createXHR();
```

<br />改成：<br />

```
//good case
var createXHR = function(){
var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
for ( var i = 0, version; version = versions[ i++ ]; ){
  try{
   return new ActiveXObject( version );
  }catch(e){
  }
 }
};
```


<a name="8c224180"></a>
#### 提前让函数退出代替嵌套条件分支，条件退出前置

<br />挑选一些条件分支，在进入这些条件分支之后，就立即让这个函数退出。避免过于复杂的嵌套条件分支语句。<br />

```
//bad case
var del = function( obj ){
  var ret;
  if ( !obj.isReadOnly ){ // 不为只读的才能被删除
      if ( obj.isFolder ){ // 如果是文件夹
          ret = deleteFolder( obj );
      }else if ( obj.isFile ){ // 如果是文件
          ret = deleteFile( obj );
      }
  }
  return ret;
};
```

<br />改成：<br />

```
//good case
var del = function( obj ){
  if ( obj.isReadOnly ){ // 反转if 表达式
  	return;
  }
  if ( obj.isFolder ){
  	return deleteFolder( obj );
  }
  if ( obj.isFile ){
  	return deleteFile( obj );
  }
};
```


<a name="76c2c818"></a>
#### 传递对象参数代替过长的参数列表

<br />有时候一个函数有可能接收多个参数，而参数的数量越多，函数就越难理解和使用。我们可以把参数都放入一个对象内,需要的数据可以自行从该对象里获取,不用再关心参数的数量和顺序.<br />

```
//bad case
var setUserInfo = function( id, name, address, sex, mobile, qq ){
console.log( 'id= ' + id );
  console.log( 'name= ' +name );
  console.log( 'address= ' + address );
  console.log( 'sex= ' + sex );
  console.log( 'mobile= ' + mobile );
  console.log( 'qq= ' + qq );
};
setUserInfo( 1314, 'sven', 'shenzhen', 'male', '137********', 377876679 );
```

<br />改成：<br />

```
//good case
var setUserInfo = function( obj ){
  console.log( 'id= ' + obj.id );
  console.log( 'name= ' + obj.name );
  console.log( 'address= ' + obj.address );
  console.log( 'sex= ' + obj.sex );
  console.log( 'mobile= ' + obj.mobile );
  console.log( 'qq= ' + obj.qq );
};
setUserInfo({
  id: 1314,
  name: 'sven',
  address: 'shenzhen',
  sex: 'male',
  mobile: '137********',
  qq: 377876679
});
```


<a name="8e5579f3"></a>
#### 尽量减少参数数量

<br />如果调用一个函数时需要传入多个参数，那这个函数是让人望而生畏的，我们必须搞清楚这<br />些参数代表的含义，必须小心翼翼地把它们按照顺序传入该函数。实际开发中，向函数传递参数不可避免，但我们应该尽量减少函数接收的参数数量。<br />

```
//bad case
var draw = function( width, height, square ){};
```

<br />改成：<br />

```
//good case
var draw = function( width, height ){
  var square = width * height;
};
```


<a name="d6c5716c"></a>
#### 少用三目运算符

<br />有一些程序员喜欢大规模地使用三目运算符，来代替传统的if、else。但是有些时候要保证代码可读性和可维护性，尽量少用三目运算符。<br />

```
//bad case
var global = typeof window !== "undefined" ? window : this;
```

<br />改成：<br />

```
//good case
var global = null;
if (typeof window !== "undefined") {
	global = window;
else{
	global = this;
}
```


<a name="81007cda"></a>
#### 合理使用链式调用

<br />链式调用的方式并不会造成太多阅读上的困难，也能省下一些字符和中间变量。链式调用带来的坏处就是在调试的时候非常不方便，如果我们知道一条链中有错误出现，必须得先把这条链拆开才能加上一些调试log 或者增加断点，这样才能定位错误出现的地方。如果该链条的结构相对稳定，后期不易发生修改，那么使用链式调用无可厚非。但如果该链条很容易发生变化，导致调试和维护困难，那么还是建议使用普通调用的形式。<br />

```
//bad case
var User = {
  id: null,
  name: null,
  setId: function( id ){
    this.id = id;
    return this;
  },
  setName: function( name ){
    this.name = name;
    return this;
  }
};
console.log( User.setId( 1314 ).setName( 'sven' ) );
```

<br />改成：<br />

```
//good case
var user = new User();
user.setId( 1314 );
user.setName( 'sven' );
```


<a name="cc286419"></a>
#### 分解大型类

<br />如果一个类的职责太大了，实际上它的职责完全有必要拆成多个的类存在，面向对象设计鼓励将行为分布在合理数量的更小对象。<br />

```
//bad case
var Spirit = function( name ){
  this.name = name;
};
Spirit.prototype.attack = function( type ){ // 攻击
  if ( type === 'waveBoxing' ){
   console.log( this.name + ': 使用波动拳' );
  }else if( type === 'whirlKick' ){
    console.log( this.name + ': 使用旋风腿' );
  }
};
var spirit = new Spirit( 'RYU' );
spirit.attack( 'waveBoxing' ); // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' ); // 输出：RYU: 使用旋风腿
```

<br />改为：<br />

```
//good case
var Attack = function( spirit ){
  this.spirit = spirit;
};
Attack.prototype.start = function( type ){
  return this.list[ type ].call( this );
};
Attack.prototype.list = {
  waveBoxing: function(){
    console.log( this.spirit.name + ': 使用波动拳' );
  },
  whirlKick: function(){
    console.log( this.spirit.name + ': 使用旋风腿' );
  }
};

var Spirit = function( name ){
  this.name = name;
  this.attackObj = new Attack( this );
};
Spirit.prototype.attack = function( type ){ // 攻击
  this.attackObj.start( type );
};
var spirit = new Spirit( 'RYU' );
spirit.attack( 'waveBoxing' ); // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' ); // 输出：RYU: 使用旋风腿
```


<a name="f50f770d"></a>
#### 用return 退出多重循环

<br />假设在函数体内有一个两重循环语句，我们需要在内层循环中判断，当达到某个临界条件时<br />退出外层的循环。我们大多数时候会引入一个控制标记变量,但这做法无疑都让人头晕目眩，更简单的做法是在需要中止循环的时候直接退出整个方法。<br />

```
//bad case
var func = function(){
var flag = false;
for ( var i = 0; i < 10; i++ ){
  for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        flag = true;
        break;
      }
    }
    if ( flag === true ){
      break;
    }
  }
};
```

<br />改成：<br />

```
//good case
var func = function(){
  for ( var i = 0; i < 10; i++ ){
    for ( var j = 0; j < 10; j++ ){
      if ( i * j >30 ){
        return;
      }
    }
  }
};
```


<a name="25f9c7fa"></a>
### 总结

<br />很早些年其实看了不少次《设计模式》系列的书籍，但是以前项目经验太少，也因为代码写的少，对代码设计这块其实领悟得不够多。如今做了一段时间后回顾这块内容的时候，对自己在代码设计以及重构方面还是有了很大的帮助。后续还是要怀抱着对代码的敬畏之心，好好写好自己的代码。

