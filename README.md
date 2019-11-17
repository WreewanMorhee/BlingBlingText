# Bling Bling Text
Make your Web has fancy text animation
[DEMO]()


## How to install
go to your terminal and type the following:
```bash
yarn add bling-bling-text
```
then                 
```html
<script src='node_modules/bling-bling-text/dist/index.js'></script>
```

## How to use:

```html
<body>
  <div class='first-class'>I am first bling bling text</div>
  <div class='second-class'>I am second bling bling text</div>

  <script src='node_modules/bling-bling-text/dist/index.js'></script>
  <script type='text/javascript'>
    BlingBlingText.init({
      data: [
      {
        class_name: '.first-class',
        event_type: 'hover',
        move_speed: 1000,
        vanish_speed: 200,
        loop_interval: 2000,
        blingbling_css: {
          'text-shadow': '1px 1px 2px #FFFFBB',
          color: '#008866',
          transform: 'translateX(5px) translateY(5px)'
        }
      },
      {
        class_name: '.second-class',
        event_type: 'hover',
        move_speed: 1000,
        vanish_speed: 200,
        loop_interval: 2000,
        blingbling_css: {
          color: 'purple',
        }
      },
    ]})
  </script>
</body>
```      
WARNING: there can ONLY be text in div,
the example below is all anti-pattern:
```html
<div class='first-class'>
  I am first <br /> bling bling text
</div>

<div class='first-class'>
  I am first <img src='https://img.jpg' /> bling bling text
</div>

<div class='first-class'>
  I am first <span>another text</span> bling bling text
</div>
```        

## Parameter             
### class_name         
type: string    
required    
usage: the class you want to have bling-bling-text                
PS: you can also write: '.outer-class .inner-class',   just like write chain css

### event_type         
type: string    
default: ''    
usage: the way to trigger bling_bling_css, three choice:        
'hover' 'click' ''          
empty string means it will loop infinite

### loop_interval         
type: number    
default: 3000           
usage: the interval of each loop,
if loop mode is opened (give event_type: '')

### move_speed         
type: number    
default: 2000    
usage: the speed bling_bling_css move toward, bigger number make it more fast

### vanish_speed         
type: number    
default: 200    
usage: the speed bling_bling_css vanish, bigger number make it more fast to vanish

### blingbling_css         
type: object    
default: {}    
usage: the css you want to add in text,
all the css property that can be animated can be written here,                
and just like write css here


## Message Me
It's welcome to message me or send me issue if this cannot satisfy your requirement

## Author
[WreewanMorhee](https://github.com/WreewanMorhee)
