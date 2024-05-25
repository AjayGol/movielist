module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-transform-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".ts", ".tsx"],
          alias: {
            "@api": "./api",
            "@utils": "./utils",
          },
        },
      ],
    ],
  };
};
