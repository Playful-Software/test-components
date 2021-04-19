// TODO: HW_PERFORMANCE

/*
https://www.youtube.com/watch?v=0ifChJ0nJfM

https://www.shadertoy.com/view/Ms2SD1
https://www.shadertoy.com/view/4tdSWr
https://www.shadertoy.com/view/ldX3zr
https://www.shadertoy.com/view/Xsf3zX
https://www.shadertoy.com/view/llVXRd
https://www.shadertoy.com/view/lsl3RH
https://www.shadertoy.com/view/XtlSD7
https://www.shadertoy.com/view/MdlXz8
https://www.shadertoy.com/view/4dl3zn
https://www.shadertoy.com/view/MdSGDm
https://www.shadertoy.com/view/ldfSW2
https://www.shadertoy.com/view/Mdf3z7
https://www.shadertoy.com/view/4ds3zn HW_PERFORMANCE
https://www.shadertoy.com/view/XsXSWS
https://www.shadertoy.com/view/lslGWr
https://www.shadertoy.com/view/4sVczV
https://www.shadertoy.com/view/Xtf3zn
https://www.shadertoy.com/view/Xd23Dh
https://www.shadertoy.com/view/llSyDh
https://www.shadertoy.com/view/Xs2GDd
https://www.shadertoy.com/view/lsf3RH
https://www.shadertoy.com/view/4sfGWX
https://www.shadertoy.com/view/Mss3WN
https://www.shadertoy.com/view/Mts3zM
https://www.shadertoy.com/view/MlKSWm
https://www.shadertoy.com/view/MdXSzS
https://www.shadertoy.com/view/4tlSzl
https://www.shadertoy.com/view/XljGDz
https://www.shadertoy.com/view/4slSWf
https://www.shadertoy.com/view/lsXcWn
https://www.shadertoy.com/view/4dsGzH
https://www.shadertoy.com/view/WtfGDX
https://www.shadertoy.com/view/4s2SRt
https://www.shadertoy.com/view/lsdGzN
https://www.shadertoy.com/view/ll2SRy
https://www.shadertoy.com/view/ttXGWH
https://www.shadertoy.com/view/4ssXRX
https://www.shadertoy.com/view/4dt3zn
https://www.shadertoy.com/view/lss3WS
https://www.shadertoy.com/view/XsfGRn
https://www.shadertoy.com/view/Xsf3zX
https://www.shadertoy.com/view/ldf3RN
https://www.shadertoy.com/view/wdBGWD
https://www.shadertoy.com/view/ltjGDd

https://www.shadertoy.com/view/MdSXzz
https://www.shadertoy.com/view/lt2fDz
https://www.shadertoy.com/view/4lfSzS
https://www.shadertoy.com/view/Ml2GWy
https://www.shadertoy.com/view/Xt23z3
https://www.shadertoy.com/view/wdfGW4
https://www.shadertoy.com/view/lsSXzD
https://www.shadertoy.com/view/XttSz2
https://www.shadertoy.com/view/lsX3W4
https://www.shadertoy.com/view/WdXGRj
https://www.shadertoy.com/view/lsKcDD
https://www.shadertoy.com/view/lssGRM
https://www.shadertoy.com/view/wsl3WB
https://www.shadertoy.com/view/WdB3Dw
https://www.shadertoy.com/view/tlGfzd
https://www.shadertoy.com/view/lttBzN
https://www.shadertoy.com/view/ltfSWn HW_PERFORMANCE
https://www.shadertoy.com/view/wlKXWc
https://www.shadertoy.com/view/tlV3zy
https://www.shadertoy.com/view/tdBGWD
https://www.shadertoy.com/view/4dGyRh
https://www.shadertoy.com/view/4scBW8
https://www.shadertoy.com/view/WdGSDd 2020
https://www.shadertoy.com/view/ldyBWD
https://www.shadertoy.com/view/Xd3BW2
https://www.shadertoy.com/view/Xd2GW3
https://www.shadertoy.com/view/MtSBRw
https://www.shadertoy.com/view/MscBRs
https://www.shadertoy.com/view/Xdf3z8
https://www.shadertoy.com/view/XsXBDX
https://www.shadertoy.com/view/lty3zc
https://www.shadertoy.com/view/lsXcWn
https://www.shadertoy.com/view/MdySzc
https://www.shadertoy.com/view/4sXBRn
https://www.shadertoy.com/view/4lsfWX
https://www.shadertoy.com/view/MtXfD2
https://www.shadertoy.com/view/Xd2XDm
https://www.shadertoy.com/view/MtGSWc
https://www.shadertoy.com/view/4tXcRl

// Fail
https://www.shadertoy.com/view/Xds3zN
https://www.shadertoy.com/view/Xsd3zf
https://www.shadertoy.com/view/lljSDy
https://www.shadertoy.com/view/ttVBzd
https://www.shadertoy.com/view/4tVBDz
https://www.shadertoy.com/view/Mt3yW7
https://www.shadertoy.com/view/llScR1
https://www.shadertoy.com/view/XlccWH
https://www.shadertoy.com/view/XdyyDV
https://www.shadertoy.com/view/lt2fD3
https://www.shadertoy.com/view/XtGGRt

*/

const ShadertoyPrototype = {
  _requestId: 0,

  mount(container, insertBefore) {
    this._element = document.createElement('canvas');
    super.mount(container, insertBefore);

    this.refresh();
  },

  unmount() {
    super.unmount();

    if (this._requestId) {
      cancelAnimationFrame(this._requestId);
      this._requestId = undefined;
    }
  },

  update(changed) {
    super.update(changed);

    if (this.play) {
      if (this.start) this.start();
    } else {
      if (this.stop) this.stop();
    }

    const element = this._element;

    // Canvas has a display width "width" and a backing-store width "canvasWidth".
    // If canvasWidth is not set the display width is used as the backing-store width.
    if (changed.width || changed.canvasHeight) {
      const width = this.canvasWidth || this.width;
      // Be careful to only set the element.width if it has really changed because it clears the canvas.
      if (element.width !== width) {
        element.width = width;
      }
    }

    // Canvas has a display height "height" and a backing-store height "canvasHeight".
    // If canvasHeight is not set the display height is used as the backing-store height.
    if (changed.height || changed.canvasHeight) {
      const height = this.canvasHeight || this.height;
      // Be careful to only set the element.height if it has really changed because it clears the canvas.
      if (element.height !== height) {
        element.height = height;
      }
    }

    if (changed.fragmentShader || changed.vertexShader) {
      this.refresh();
    }
  },

  refresh() {
    if (this.stop) {
      this.stop();
    }

    this.error = undefined;

    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    const canvas = this._element;

    // Preserve the drawing buffer at design time so it will be captured in
    // the project preview thumbnail. Don't do it at run time because there is
    // a performance penalty.
    const attrs = { preserveDrawingBuffer: this.project.designMode };

    const isWebGL2Context = 'WebGL2RenderingContext' in window;
    const gl = canvas.getContext(isWebGL2Context ? 'webgl2' : 'webgl', attrs);
    if (!gl) {
      this.error = 'This browser does not support WebGL.';
      return;
    }

    if (!isWebGL2Context) {
      gl.getExtension('OES_standard_derivatives');
      gl.getExtension('EXT_shader_texture_lod');
    }

    // setup GLSL program
    const fs = `
    precision highp float;
    ${isWebGL2Context ? 'out vec4 FragColor;\n' : ''}

    uniform vec3 iResolution;
    uniform vec4 iMouse;
    uniform float iTime;
    uniform int iFrame;

    ${this.fragmentShader}

    void main() {
      vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
      mainImage(color, gl_FragCoord.xy);
      ${isWebGL2Context ? 'FragColor' : 'gl_FragColor'} = color;
    }
    `;

    const vs = `
    ${isWebGL2Context ? 'in' : 'attribute'} vec4 a_position;

    void main() {
      gl_Position = a_position;
    }`;

    const program = createProgramFromSources(
      gl,
      [
        (isWebGL2Context ? '#version 300 es\n' : '') + vs,
        (isWebGL2Context ? '#version 300 es\n' : '') + fs,
      ],
      undefined,
      undefined,
      (err) => (this.error = err)
    );
    if (!program) {
      return;
    }

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');

    // look up uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const mouseLocation = gl.getUniformLocation(program, 'iMouse');
    const timeLocation = gl.getUniformLocation(program, 'iTime');
    const frameLocation = gl.getUniformLocation(program, 'iFrame');

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // fill it with a 2 triangles that cover clipspace
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1,
        -1, // first triangle
        1,
        -1,
        -1,
        1,
        -1,
        1, // second triangle
        1,
        -1,
        1,
        1,
      ]),
      gl.STATIC_DRAW
    );

    let then = 0;
    let time = 0;
    let frame = 0;
    const render = (now) => {
      this._requestId = undefined;
      now *= 0.001; // convert to seconds
      const elapsedTime = Math.min(now - then, 0.1);
      time += elapsedTime;
      then = now;

      resizeCanvasToDisplaySize(gl.canvas);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Tell it to use our program (pair of shaders)
      gl.useProgram(program);

      // Turn on the attribute
      gl.enableVertexAttribArray(positionAttributeLocation);

      // Bind the position buffer.
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
      gl.vertexAttribPointer(
        positionAttributeLocation,
        2, // 2 components per iteration
        gl.FLOAT, // the data is 32bit floats
        false, // don't normalize the data
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0 // start at the beginning of the buffer
      );

      gl.uniform3f(resolutionLocation, gl.canvas.width, gl.canvas.height, 1); // TODO: z
      gl.uniform4f(mouseLocation, mouseX, mouseY, 0, 0); // TODO: click
      gl.uniform1f(timeLocation, time);
      gl.uniform1i(frameLocation, frame);
      // TODO: float iTimeDelta
      // TODO: vec4 iDate

      gl.drawArrays(
        gl.TRIANGLES,
        0, // offset
        6 // num vertices to process
      );

      frame++;
      requestFrame();
    };

    const requestFrame = () => {
      if (!this._requestId) {
        this._requestId = requestAnimationFrame(render);
      }
    };

    const cancelFrame = () => {
      if (this._requestId) {
        cancelAnimationFrame(this._requestId);
        this._requestId = undefined;
      }
    };

    // TODO: const playpauseElem = document.querySelector('.playpause');
    const inputElem = canvas; // TODO: document.querySelector('.divcanvas');

    let mouseX = 0;
    let mouseY = 0;

    function setMousePosition(e) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = rect.height - (e.clientY - rect.top) - 1; // bottom is 0 in WebGL
    }

    inputElem.addEventListener('mousemove', setMousePosition);
    inputElem.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        setMousePosition(e.touches[0]);
      },
      { passive: false }
    );

    this.start = requestFrame;
    this.stop = cancelFrame;

    requestFrame();
  },
};

const defaultFragmentShader = `void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 uv = fragCoord.xy / iResolution.xy;
  vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0,2,4));
  fragColor = vec4(col ,1.0);
}`;

//
// From https://webglfundamentals.org/
//

const defaultShaderType = ['VERTEX_SHADER', 'FRAGMENT_SHADER'];

/**
 * Creates a program from 2 sources.
 *
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext
 *        to use.
 * @param {string[]} shaderSourcess Array of sources for the
 *        shaders. The first is assumed to be the vertex shader,
 *        the second the fragment shader.
 * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @return {WebGLProgram} The created program.
 * @memberOf module:webgl-utils
 */
function createProgramFromSources(
  gl,
  shaderSources,
  opt_attribs,
  opt_locations,
  opt_errorCallback
) {
  const shaders = [];
  for (let ii = 0; ii < shaderSources.length; ++ii) {
    const shader = loadShader(gl, shaderSources[ii], gl[defaultShaderType[ii]], opt_errorCallback);
    if (!shader) {
      return;
    }
    shaders.push(shader);
  }
  return createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback);
}

/**
 * Creates a program, attaches shaders, binds attrib locations, links the
 * program and calls useProgram.
 * @param {WebGLShader[]} shaders The shaders to attach
 * @param {string[]} [opt_attribs] An array of attribs names. Locations will be assigned by index if not passed in
 * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
 * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors. By default it just prints an error to the console
 *        on error. If you want something else pass an callback. It's passed an error message.
 * @memberOf module:webgl-utils
 */
function createProgram(gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  const program = gl.createProgram();
  shaders.forEach(function (shader) {
    gl.attachShader(program, shader);
  });
  if (opt_attribs) {
    opt_attribs.forEach(function (attrib, ndx) {
      gl.bindAttribLocation(program, opt_locations ? opt_locations[ndx] : ndx, attrib);
    });
  }
  gl.linkProgram(program);

  // Check the link status
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    // something went wrong with the link
    const lastError = gl.getProgramInfoLog(program);
    errFn('Error in program linking:' + lastError);

    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * Loads a shader.
 * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
 * @param {string} shaderSource The shader source.
 * @param {number} shaderType The type of shader.
 * @param {module:webgl-utils.ErrorCallback} opt_errorCallback callback for errors.
 * @return {WebGLShader} The created shader.
 */
function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
  const errFn = opt_errorCallback || error;
  // Create the shader object
  const shader = gl.createShader(shaderType);

  // Load the shader source
  gl.shaderSource(shader, shaderSource);

  // Compile the shader
  gl.compileShader(shader);

  // Check the compile status
  const compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    // Something went wrong during compilation; get the error
    const lastError = gl.getShaderInfoLog(shader);
    errFn('Error compiling shader: ' + lastError);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
 * Resize a canvas to match the size its displayed.
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] amount to multiply by.
 *    Pass in window.devicePixelRatio for native pixels.
 * @return {boolean} true if the canvas was resized.
 * @memberOf module:webgl-utils
 */
function resizeCanvasToDisplaySize(canvas, multiplier) {
  multiplier = multiplier || 1;
  const width = (canvas.clientWidth * multiplier) | 0;
  const height = (canvas.clientHeight * multiplier) | 0;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

/**
 * Wrapped logging function.
 * @param {string} msg The message to log.
 */
function error(msg) {
  // eslint-disable-next-line no-console
  console.error(msg);
}

export const ShadertoyDescription = {
  name: 'Shadertoy',
  description: 'https://shadertoy.com',
  extends: 'Play Kit/View',
  prototype: ShadertoyPrototype,
  properties: {
    title: { type: 'string', default: 'Sample', editor: { type: 'String', fullWidthEditor: true } },
    description: {
      type: 'string',
      default: 'Sample shader from Shadertoy: https://www.shadertoy.com/',
      editor: 'MultilineString',
    },
    fragmentShader: {
      type: 'string',
      default: defaultFragmentShader,
      editor: {
        type: 'Script',
      },
    },
    author: { type: 'string', default: '' },
    link: { type: 'string', default: '' },
    // TODO: allow type-inferred simple form ala pause: false?
    play: { type: 'boolean', default: true },
    backgroundColor: { type: 'string', default: '#000000ff', editor: 'Color' },
    // TODO: How to present properties like this? (probably most readOnly properties are the same).
    //error: { type: 'string', editor: 'MultilineString', readOnly: true },
    width: { type: 'number', default: 1024 / 2 },
    height: { type: 'number', default: 576 / 2 },
  },
};
