export default (app, options = {}) => {
  if (!app) {
    throw new Error("Notify plugin requires a app object!");
  }

  const containerId = "__webx1-notify-flash-grid__";

  const createFlashContainer = (id) => {
    let container = document.createElement("div");
    container.id = id;
    container.style.position = "fixed";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr";
    container.style.zIndex = 999;
    window.document.body.appendChild(container);
    return container;
  };

  const defaultFlashOptions = {
    area: options.area || "bottom center",
    messageClass: options.messageClass || "message",
    yOffset: options.yOffset || 20,
    xOffset: options.xOffset || 20,
    duration: options.duration || 4000,
    closable: false
  };
  const positionContainer = (container, opts) => {
    // reset
    container.style.top = "";
    container.style.bottom = "";
    container.style.right = "";
    container.style.left = "";
    container.style.transform = "";

    container.dataset["area"] = opts.area;

    switch (opts.area) {
      case "top left":
        container.style.top = `${opts.yOffset}px`;
        container.style.left = `${opts.xOffset}px`;
        break;
      case "top right":
        container.style.top = `${opts.yOffset}px`;
        container.style.right = `${opts.xOffset}px`;
        break;
      case "top center":
        container.style.top = `${opts.yOffset}px`;
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        break;
      case "bottom left":
        container.style.bottom = `${opts.yOffset}px`;
        container.style.left = `${opts.xOffset}px`;
        break;
      case "bottom right":
        container.style.bottom = `${opts.yOffset}px`;
        container.style.right = `${opts.xOffset}px`;
        break;
      default:
        // bottom center
        container.style.bottom = `${opts.yOffset}px`;
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        break;
    }
  };

  const _flash = (msg, options = {}, closable = false) => {
    let id = `${containerId}${options.area.replace(" ", "_")}`;

    let container = document.getElementById(id);

    if (!container) {
      container = createFlashContainer(id, options);
      positionContainer(container, options);
    }

    let div = document.createElement("div");
    div.className = options.messageClass;
    div.style.position = "relative";
    div.innerHTML = msg;

    container.appendChild(div);

    if (!closable) {
        setTimeout(function () {
        div.parentNode.removeChild(div);
        }, options.duration);
        return;
    }
    let closer = document.createElement('span');
    closer.innerHTML = '&times;';
    closer.className = 'close';
    div.appendChild(closer);

    closer.addEventListener('click', (e) => {
        e.preventDefault();
        div.parentNode.removeChild(div);
    });
  };

  return {
    notify: (
        msg,
        areaOrOptions = defaultFlashOptions.area,
        duration = defaultFlashOptions.duration,
        messageClass = defaultFlashOptions.messageClass,
        xOffset = defaultFlashOptions.xOffset,
        yOffset = defaultFlashOptions.yOffset        
      ) => {
        if (arguments.length === 2) {
          _flash(msg, areaOrOptions, true);
          return;
        }
        _flash(msg, {
          area: areaOrOptions,
          duration,
          messageClass,
          xOffset,
          yOffset,
        }, true);
      },
    flash: (
      msg,
      areaOrOptions = defaultFlashOptions.area,
      duration = defaultFlashOptions.duration,
      messageClass = defaultFlashOptions.messageClass,
      xOffset = defaultFlashOptions.xOffset,
      yOffset = defaultFlashOptions.yOffset
    ) => {
      if (arguments.length === 2) {
        _flash(msg, areaOrOptions, false);
        return;
      }
      _flash(msg, {
        area: areaOrOptions,
        duration,
        messageClass,
        xOffset,
        yOffset,
      }, false);
    },
  };
};
