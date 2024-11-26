module.exports = {
	plugins: [
		// Tailwind CSS eklentisi
		require('tailwindcss'),

		// Autoprefixer, CSS için vendor prefix'leri ekler
		require('autoprefixer'),

		// Üretim ortamında CSS dosyasını küçültmek için cssnano
		...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : [])
	],
};
