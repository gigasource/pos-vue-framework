[_] làm sao để hooks để có thể accessibility vào 1 component
hoặc là tạo ra 1 component cấp cao hơn
[_] idea: ui tool để có thể ghép thành 1 component thông qua các luồng data
[_] tránh việc truyền dữ liệu qua quá nhiều nơi 
[_] có thể dùng vue-portal

```jsx
function setup() {
  const env = {};
  
  const render = () => <div>
    <p>test</p>
  </div>
  
  return decorator(render, env);
}
//problem1: flat structure
//problem2: dùng tối đa portal 
//về cơ bản là xây dựng data trước , rồi xây ui sau

hooks.on('compA:div:1', node => {
  
})
```

[_] 2d tool , truy cập data lấy data rồi access vào ?

[_] có thể tạo ra factory rồi mapping thông qua diagram tool để đến đc ui
[_] vấn đề bao h cũng là các luồng data rất complex phát sinh thông qua việc tạo ra ui tool đó

[_] tool về data quan trọng hơn nhiều

[_] vd trang admin: có thể tạo đc các fake data mà ko cần phải làm gì nhiều

[_] concept: import,export,flat autocomplete, tránh đưa nhiều data vào 1 luồng
[_] đặt tên file : static -> chỉ layout ko quan tâm đến luồng data để binding

[_] nếu data đơn giản thì về lý thuyết phải tìm cách để binding đc

vd trong trường hợp màn order


