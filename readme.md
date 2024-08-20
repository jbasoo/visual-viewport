# Visual Viewport Debugger

Throw this standalone web component on a page for an overlay that logs the current [visual viewport](https://developer.mozilla.org/en-US/docs/Web/API/Visual_Viewport_API) values (offsetLeft, offsetTop, pageLeft, pageTop, width, height, scale). It always remains the same size and stays in the same position when scaling and panning.

<img src="https://github.com/jbasoo/visual-viewport/blob/main/visual-viewport-debugger-light.jpg" alt="Light mode screenshot of the component" width="320" height="320"> <img src="https://github.com/jbasoo/visual-viewport/blob/main/visual-viewport-debugger-dark.jpg" alt="Dark mode screenshot of the component" width="320" height="320">


## Usage

```HTML
    <script type="module">
        import('./visual-viewport.js').then((mod) => {
            mod.VisualViewport.register();
        });
    </script>

    <button popovertarget="visual-viewport" popovertargetaction="show">Open Visual Viewport Debugger</button>

    <visual-viewport data-position="center-center" popover="manual" id="visual-viewport"></visual-viewport>
```

## Aren't there easier ways to get this info?
Yeah, the console is probably all you need. Live expressions also kinda work but [truncate large objects](https://issues.chromium.org/issues/359593396). Maybe there's a workaround I haven't figured out yet.

## Then why?
To learn. Through making it I got to play with the visual viewport, weird CSS math, light-dark(), custom elements, shadow DOM, adopted stylesheets, ESM, and popovers.

## Could this be a browser extension?
Probably, but I don't know how to do that... yet.

## Isn't the design a bit 1995?
I think you mean retro or nostalgic.
