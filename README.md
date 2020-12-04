# Craig Reynolds Steering behaviours demonstrations 
    
> Steering Behaviours For Autonomous Characters. 
>
> Abstract: This paper presents solutions for one requirement of autonomous characters in animation and games: the ability to navigate around their world in a life-like and improvisational manner. These "steering behaviours" are largely independent of the particulars of the character's means of locomotion. Combinations of steering behaviours can be used to achieve higher level goals (For example: get from here to there while avoiding obstacles, follow this corridor, join that group of characters...) This paper divides motion behaviour into three levels. It will focus on the middle level of steering behaviours, briefly describe the lower level of locomotion, and touch lightly on the higher level of goal setting and strategy.
>
> ---Craig Reynolds

[More information about Craig and the research on steering behaviours](http://www.red3d.com/cwr/)

The project is built with [Svelte](https://svelte.dev/) and [p5js](https://p5js.org/).

# Online

Find this project deployed here:

[https://sedesteeringbehavior.z16.web.core.windows.net](https://sedesteeringbehavior.z16.web.core.windows.net)

![screenshot](screenshot.png)

# Run locally

```
npm install
npm run dev
```

# Build for production

```
npm run build
```

Then copy the `public` folder to the web server.
