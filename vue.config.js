module.exports = {
  chainWebpack: config => {
    config.module
      .rule('glsl')
      .test(/\.(glsl|frag|vert)$/)
      .use('raw')
      .loader('raw-loader')
      .end()
      .use('glslify')
      .loader('glslify-loader')
      .end()
  },
}
