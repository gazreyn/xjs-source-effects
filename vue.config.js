module.exports = {
    publicPath: '',
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'Source Effects.html',
            title: 'Source Effects',
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}