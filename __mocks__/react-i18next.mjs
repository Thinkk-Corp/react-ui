module.exports = {
    useTranslation: () => {
      return {
        t: (key) => key, // 'theme.dropzone.drag_inactive_label' gibi döner
        i18n: {
          changeLanguage: () => Promise.resolve(),
        },
      };
    },
    Trans: ({ children }) => children,
  };
  