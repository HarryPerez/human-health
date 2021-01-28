import i18next from 'i18next';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

i18next.init({
  lng: process.env.REACT_APP_TRANSLATION_COUNTRY,
  initImmediate: false,
  fallbackLng: 'es'
});

requireAll(require.context('..', true, /i18n\.js$/));
