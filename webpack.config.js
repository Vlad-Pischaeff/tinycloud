module.exports = {
    entry:   __dirname + '/src/static/js/index.js',
    output: {
        path: __dirname + '/src/static/dist',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                  presets: ['@babel/preset-env',
														'@babel/preset-react',{
								             		'plugins': ['@babel/plugin-proposal-class-properties']
																									}
									]
                },                                                             
						},
            {
                test: /\.(png|svg|jpg|gif)$/,
								loader: 'url-loader?limit=200000'
            },
				   	{
      					test: /\.css$/,
      					use: ['style-loader', 'css-loader']
    				}
        ]
    }
}
