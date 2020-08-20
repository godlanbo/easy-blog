import Mock from 'mockjs'
import { blogsList } from './../utils/mock';

Mock.mock(/\/blogs\/\d+$/, 'get', {
  'status': 200,
  'data': {
    'id|1-20': 20,
    'cover|1': ['/image/demo1.png', '/image/demo3.png', '/image/avatar.jpeg', '/image/demo2.jpg'],
    'title': 'JS事件循环之异步任务',
    'tags': ['Vue', 'Sass'],
    'author': 'GodLanBo',
    releaseTime: 1597407302225,
    content: `# JS事件循环之异步任务

    ### 什么是异步任务
    
    首先我们知道，js是单线程语言，事件循环是js的事件执行机制。因为js是单线程的所以就导致，如果一个任务执行时间太长，会导致后面的任务无法执行，进而卡住执行栈。所以在js中将任务分为两类：
    
    * 同步任务
    * 异步任务
    
    同步任务直接添加到执行栈中，异步任务则在自己需要的准备工作完成后添加在执行栈中，这样就不会因为异步任务所需要的准备时间过长而导致执行阻塞。
    
    ### 异步任务的执行
    
    异步任务在创建的时候，不会立即执行，而是会被注册到事件表（Event Table）中，然后继续执行主线程的同步任务，当异步任务准备就绪的时候，会将注册的回调函数放入任务队列（Event Queue）。当主线程当下的任务结束后，会去任务队列里面取新的任务，这个时候异步任务的回调函数就进入主线程执行。
    
    上面这个过程会一直循环，也就是我们说的事件循环机制。
    
    \`\`\`js
    setTimeout(() => {
      console.log('回调函数执行')
    }, 100)
    console.log('主线程任务')
    \`\`\`
    
    上面代码执行后打印顺序是：“主线程任务”，等待100ms后打印 “回调函数执行”。
    
    有时候我们还能看到\`setTimeout(callBack, 0)\`,\`setTimeout(callBack)\`这样的写法，但是这种延迟为0的注册异步任务的形式并不代表它就会如同同步任务一样立即执行。
    
    \`\`\`js
    setTimeout(() => {
      console.log('回调函数执行')
    }, 0)
    console.log('主线程任务')
    \`\`\`
    
    上面的代码的执行结果仍然是：“主线程任务”， “回调函数执行”。setTimeout第二参数的意思只是最少的等待时间，这个时间一到，就会把回调函数放入任务队列，但是是否立即执行，还需要看主线程是否为空，如果当前的主线程还有其他任务在执行，那么就要等待主线程空闲后，再去任务队列拿新的任务执行。所以\`setTimeout(callBack, 0)\`只是将callBack立即加入到任务队列，此时主线程的执行栈中已经有任务在执行，所以要等到主线程空闲后再执行。
    
    ### 异步任务的分类
    
    异步任务分为两类：
    
    * 宏任务（setTimeout，setInterval，整段代码的script等）
    * 微任务（promise的then，process.nextTick等）
    
    这两类任务都属于异步任务，他们的区别在于执行顺序的不同（此图转引自[这里](https://juejin.im/post/5b498d245188251b193d4059)）：
    
    ![cmd-markdown-logo](https://user-gold-cdn.xitu.io/2018/7/14/164974fa4b42e4af?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
    
    对于上面的执行顺序，我们看个简单的例子：
    
    \`\`\`js
    console.log('start')
    setTimeout(() => {
      console.log('第一個回调')
    }, 0)
    
    Promise.resolve().then(() => {
      console.log('promise1')
    }).then(() => {
      console.log('promise2')
    })
    
    setTimeout(() => {
      console.log('第二个回调')
    }, 0)
    
    console.log('end')
    \`\`\`
    
    首先整块代码当做一个宏任务执行，先执行同步任务，输出start，然后将第一个setTimeout添加到宏任务队列记做\`setTimeout1\`，然后填加promise的两个then到微任务队列我们记做\`then1\`和\`then2\`，再将第二个setTimeout添加到宏任务记做\`setTimeout2\`，最后输出end，此时的两类异步任务的队列情况如下：
    
    | 宏任务队列（macrotasks queues） | 微任务队列（microtasks queues） |
    | ------------------------------- | ------------------------------- |
    | setTimeout1                     | then1                           |
    | setTimeout2                     | then2                           |
    
    这个时候整个代码宏任务完成，去微任务队列清空所有的微任务，输出promise1,promise2，然后拿出一个宏任务执行。如此重复上面的步骤。所以最后输出结果是：start, end, promise1, promise2, 第一個回调，第二个回调。
    
    ### 结尾
    
    以上就是关于js异步任务的简单介绍。
    
    ### 参考文献
    
    https://juejin.im/post/5b498d245188251b193d4059
    
    https://juejin.im/post/59c25c936fb9a00a3f24e114
    
    http://www.ruanyifeng.com/blog/2014/10/event-loop.html`
  }
})
Mock.mock(/\/blogs\/categoryList/, 'get', {
  status: 200,
  data: {
    // 'categoryList|5-8': [2013,2014,2015,2016,2017,2018,2019,2020],
    'categoryList|1-8': [
      {
        "name|+1": ["Vue", "node", "axios", "javascript", "css", "mysql", "scss", "vuepress"],
        "num|+1": [32, 21, 12, 11, 10, 5]
      }
    ]
  }
})
Mock.mock(/\/blogs$/, 'get', {
  status: 200,
  data: {
    blogsList
  }
})