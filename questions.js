// questions.js
const questions = [
  // 1. Exponential function, find C
  {
    id: 1,
    points: 1,
    text: `
      The graph of the exponential function \\(f(x) = C a^x\\) passes through the points
      \\((-1, 9)\\) and \\((1, 4)\\).  
      What is the value of \\(C\\)?
    `,
    options: [
      "\\(\\tfrac{1}{9}\\)",
      "9",
      "4",
      "\\(-\\tfrac{5}{2}\\)",
      "6"
    ],
    correctIndex: 3
  },

  // 2. Condition for invertibility
  {
    id: 2,
    points: 1,
    text: `
      Let \\(f\\) be a real-valued function defined for all real numbers.  
      Which of the following conditions guarantees that \\(f\\) has an inverse function?
    `,
    options: [
      "f is strictly increasing on \\(\\mathbb{R}\\)",
      "f is periodic",
      "f is symmetric with respect to the y-axis",
      "f is concave down on \\(\\mathbb{R}\\)",
      "f is continuous on \\(\\mathbb{R}\\)"
    ],
    correctIndex: 0
  },

  // 3. Piecewise continuity and differentiability
  {
    id: 3,
    points: 1,
    text: `
      Consider the function  
      \\[
        f(x) =
        \\begin{cases}
          x^2, & x < 3, \\\\
          6x - 9, & x \\ge 3.
        \\end{cases}
      \\]  
      At \\(x = 3\\), the function \\(f\\) is:
    `,
    options: [
      "Not defined",
      "Continuous but not differentiable",
      "Differentiable but not continuous",
      "Neither differentiable nor continuous",
      "Both continuous and differentiable"
    ],
    correctIndex: 4
  },

  // 4. Limit at infinity with radicals
  {
    id: 4,
    points: 1,
    text: `
      Evaluate the limit  
      \\[
        \\lim_{x \\to \\infty} \\frac{\\sqrt{4x^6 - x}}{x^3 + 8}.
      \\]
    `,
    options: [
      "\\(\\infty\\)",
      "2",
      "1",
      "\\(\\tfrac{1}{2}\\)",
      "0"
    ],
    correctIndex: 1
  },

  // 5. Derivative as a limit for e^x
  {
    id: 5,
    points: 1,
    text: `
      Let \\(f(x) = e^x\\).  
      Which of the following limit expressions is equal to \\(f'(e)\\)?
    `,
    options: [
      "\\(\\displaystyle \\lim_{h \\to 0} \\frac{e^h}{h}\\)",
      "\\(\\displaystyle \\lim_{h \\to 0} \\frac{e^h - e^e}{h}\\)",
      "\\(\\displaystyle \\lim_{h \\to 0} \\frac{e^h - 1}{h}\\)",
      "\\(\\displaystyle \\lim_{h \\to 0} \\frac{e^{x+h} - 1}{h}\\)",
      "\\(\\displaystyle \\lim_{h \\to 0} \\frac{e^{e+h} - e^e}{h}\\)"
    ],
    correctIndex: 2
  },

  // 6. Basic derivative evaluation
  {
    id: 6,
    points: 1,
    text: `
      Let \\(f(x) = 2x^2 + 16\\sqrt{x}\\).  
      What is the value of \\(f'(4)\\)?
    `,
    options: ["1", "2", "3", "4", "5"],
    correctIndex: 3
  },

  // 7. Quotient with square root
  {
    id: 7,
    points: 1,
    text: `
      Let \\(f(x) = \\dfrac{8x}{\\sqrt{x^2 + 3}}\\).  
      What is the value of \\(f'(1)\\)?
    `,
    options: ["1", "2", "3", "4", "5"],
    correctIndex: 1
  },

  // 8. Logarithmic differentiation
  {
    id: 8,
    points: 1,
    text: `
      Consider the function  
      \\[
        f(x) = \\ln\\!\\left( \\frac{(3x - 1)^6}{(x + 1)^4 (2x + 1)^3} \\right).
      \\]  
      What is \\(f'(1)\\)?
    `,
    options: ["1", "2", "3", "4", "5"],
    correctIndex: 4
  },

  // 9. Chain rule and quotient rule composition
  {
    id: 9,
    points: 1,
    text: `
      Suppose \\(f\\) and \\(g\\) are differentiable functions with  
      \\(f(1) = 2\\), \\(f'(1) = 9\\), \\(g(1) = 2\\), and \\(g'(1) = 4\\).  
      Define  
      \\[
        h(x) = \\frac{f(e^{2x})}{g(e^{3x})}.
      \\]  
      Find \\(h'(0)\\).
    `,
    options: ["1", "2", "3", "4", "5"],
    correctIndex: 2
  },

  // 10. Newton's Law of Cooling
  {
    id: 10,
    points: 1,
    text: `
      A roasted turkey is removed from an oven when its temperature reaches
      \\(175^\\circ\\!F\\), and it is placed in a room where the ambient temperature is
      \\(T_s = 75^\\circ\\!F\\). After 30 minutes, the turkey's temperature is
      \\(125^\\circ\\!F\\).  
      Using Newton’s Law of Cooling \\(\\dfrac{dT}{dt} = k(T - T_s)\\),
      what is the temperature of the turkey after 1 hour (in \\(^\\circ\\!F\\))?
    `,
    options: [
      "\\(100 \\ln 4\\)",
      "100",
      "\\(100 \\ln 2\\)",
      "75",
      "50"
    ],
    correctIndex: 1
  },

  // 11. Related rates: shadow of a building
  {
    id: 11,
    points: 1,
    text: `
      The angle of elevation of the Sun, denoted by \\(\\theta\\), is decreasing at a rate of
      \\(0.25\\,\\text{rad/hour}\\). A building that is 400 ft tall casts a shadow on level ground.  
      At the instant when \\(\\theta = \\pi/6\\), how fast is the length of the shadow increasing?
    `,
    options: [
      "100 ft/hour",
      "200 ft/hour",
      "300 ft/hour",
      "400 ft/hour",
      "500 ft/hour"
    ],
    correctIndex: 4
  },

  // 12. Linear approximation for sine
  {
    id: 12,
    points: 1,
    text: `
      Use a linear approximation around \\(x = \\tfrac{\\pi}{6}\\) to estimate  
      \\[
        \\sin\\left( \\frac{\\pi}{6} + \\frac{\\pi}{36} \\right).
      \\]
    `,
    options: [
      "\\(\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\pi}{72}\\)",
      "\\(\\dfrac{1}{2} + \\dfrac{\\pi\\sqrt{3}}{72}\\)",
      "\\(\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\pi}{60}\\)",
      "\\(\\dfrac{1}{2} + \\dfrac{\\pi\\sqrt{3}}{60}\\)",
      "\\(\\dfrac{\\sqrt{3}}{2} + \\dfrac{\\pi}{36}\\)"
    ],
    correctIndex: 1
  },

  // 13. Optimization on a closed interval
  {
    id: 13,
    points: 1,
    text: `
      Consider the function \\(f(x) = x + \\dfrac{1}{x}\\) on the interval \\([1/2, 2]\\).  
      What is the minimum value of \\(f\\) on this interval?
    `,
    options: [
      "2",
      "\\(\\tfrac{5}{2}\\)",
      "-2",
      "0",
      "\\(\\tfrac{1}{2}\\)"
    ],
    correctIndex: 0
  },

  // 14. Mean Value Theorem
  {
    id: 14,
    points: 1,
    text: `
      Let \\(f(x) = \\sqrt{1 + x^3}\\).  
      The Mean Value Theorem guarantees that \\(f'(c)\\) equals the average rate of change of
      \\(f\\) on the interval \\((0, 2)\\) for some \\(c \\in (0, 2)\\).  
      What is the value of this average rate of change?
    `,
    options: ["0", "1", "2", "3", "4"],
    correctIndex: 4
  },

  // 15. Limit involving e^x expansion
  {
    id: 15,
    points: 1,
    text: `
      Evaluate the limit  
      \\[
        \\lim_{x \\to 0^+} \\left( \\frac{1}{e^x - 1} - \\frac{1}{x} \\right).
      \\]
    `,
    options: [
      "-1",
      "-\\(\\tfrac{1}{2}\\)",
      "0",
      "\\(\\tfrac{1}{2}\\)",
      "1"
    ],
    correctIndex: 0
  },

  // 16. Maximum rectangle under e^{-x^2}
  {
    id: 16,
    points: 1,
    text: `
      Consider rectangles in the first quadrant under the graph of \\(y = e^{-x^2}\\),
      with one side on the x-axis and the upper side on the curve.  
      What is the area of the rectangle with the largest possible area?
    `,
    options: [
      "\\(\\dfrac{\\sqrt{2}}{e}\\)",
      "\\(\\sqrt{2e}\\)",
      "\\(\\dfrac{2}{e}\\)",
      "\\(\\dfrac{1}{\\sqrt{2}e}\\)",
      "\\(\\dfrac{2}{e^{2}}\\)"
    ],
    correctIndex: 2
  },

  // 17. Distance from origin to a line
  {
    id: 17,
    points: 1,
    text: `
      Find the minimum distance from the origin to the line \\(y = -2x + 5\\).
    `,
    options: [
      "\\(\\sqrt{2}\\)",
      "\\(\\sqrt{3}\\)",
      "\\(\\sqrt{5}\\)",
      "2",
      "5"
    ],
    correctIndex: 2
  },

  // 18. Recover f from f'' and initial data
  {
    id: 18,
    points: 1,
    text: `
      Suppose \\(f''(x) = 2x\\), \\(f(0) = 4\\), and \\(f'(0) = -3\\).  
      Find \\(f(3)\\).
    `,
    options: ["0", "2", "4", "7", "9"],
    correctIndex: 4
  },

  // 19. Indefinite integral with roots
  {
    id: 19,
    points: 1,
    text: `
      Compute the indefinite integral  
      \\[
        \\int \\sqrt{x} \\,(\\sqrt{x} - 1)\\, dx.
      \\]
    `,
    options: [
      "\\(2(x^{3/2} - x) + C\\)",
      "\\(\\tfrac{1}{2}x^{2} - x + C\\)",
      "\\(\\tfrac{1}{2}(\\sqrt{x} - 1)^{2} + C\\)",
      "\\(\\tfrac{1}{2}x^{2} - \\tfrac{2}{3}x^{3/2} + C\\)",
      "\\(x - 2\\sqrt{x} + C\\)"
    ],
    correctIndex: 3
  },

  // 20. Definite integral as area
  {
    id: 20,
    points: 1,
    text: `
      Evaluate the definite integral  
      \\[
        \\int_{0}^{1} \\left(x - \\sqrt{1 - x^{2}}\\right) dx
      \\]
      by interpreting it as a combination of areas of basic geometric shapes.
    `,
    options: [
      "\\(\\tfrac{1}{2} - \\tfrac{\\pi}{4}\\)",
      "\\(1 - \\tfrac{\\pi}{2}\\)",
      "0",
      "\\(\\tfrac{\\pi}{2} - 1\\)",
      "\\(\\tfrac{\\pi}{4} - \\tfrac{1}{2}\\)"
    ],
    correctIndex: 0
  },

  // 21. Differentiation of an integral with variable upper limit
  {
    id: 21,
    points: 1,
    text: `
      Let  
      \\[
        g(x) = \\int_{1}^{\\cos x} t^{2} \\, dt.
      \\]  
      Find \\(g'(x)\\).
    `,
    options: [
      "\\(\\cos^{2} x\\, \\sin x\\)",
      "\\(-\\cos^{2} x\\, \\sin x\\)",
      "\\(2\\cos x\\, \\sin x\\)",
      "\\(-2\\cos x\\, \\sin x\\)",
      "\\(-2\\cos x\\)"
    ],
    correctIndex: 1
  },

  // 22. Substitution integral with radical
  {
    id: 22,
    points: 1,
    text: `
      Evaluate the integral  
      \\[
        \\int_{0}^{1} \\frac{2x^{3}}{\\sqrt{3x^{4} + 1}}\\, dx.
      \\]
    `,
    options: [
      "\\(\\tfrac{1}{12}\\)",
      "\\(\\tfrac{1}{6}\\)",
      "\\(\\tfrac{1}{4}\\)",
      "\\(\\tfrac{1}{3}\\)",
      "\\(\\tfrac{1}{2}\\)"
    ],
    correctIndex: 4
  },

  // 23. Trigonometric substitution / power reduction
  {
    id: 23,
    points: 1,
    text: `
      Evaluate the integral  
      \\[
        \\int_{0}^{\\pi/6} \\sin^{3}(3x)\\, \\cos(3x)\\, dx.
      \\]
    `,
    options: [
      "\\(\\tfrac{1}{12}\\)",
      "\\(\\tfrac{1}{6}\\)",
      "\\(\\tfrac{1}{4}\\)",
      "\\(\\tfrac{1}{3}\\)",
      "\\(\\tfrac{1}{2}\\)"
    ],
    correctIndex: 1
  },

  // 24. Integral with secant and sine
  {
    id: 24,
    points: 1,
    text: `
      Evaluate the integral  
      \\[
        \\int_{0}^{\\pi/4} \\sin x\\, \\sec^{3} x\\, dx.
      \\]
    `,
    options: [
      "\\(\\tfrac{1}{12}\\)",
      "\\(\\tfrac{1}{6}\\)",
      "\\(\\tfrac{1}{4}\\)",
      "\\(\\tfrac{1}{3}\\)",
      "\\(\\tfrac{1}{2}\\)"
    ],
    correctIndex: 2
  },

  // 25. Integral with ln x in the denominator
  {
    id: 25,
    points: 1,
    text: `
      Evaluate the integral  
      \\[
        \\int_{e}^{e^{9}} \\frac{dx}{x\\sqrt{\\ln x}}.
      \\]
    `,
    options: [
      "1",
      "2",
      "3",
      "4",
      "6"
    ],
    correctIndex: 2
  }
];
