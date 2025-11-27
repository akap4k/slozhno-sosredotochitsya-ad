(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
    //определяет тему
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
     // Находит все кнопки для переключения тем
  const themeButtons = [
    ...document.querySelectorAll('.head__menu-btn'),
  ];
  setActiveButton(themeButtons, currentTheme); //  // Устанавливает активную кнопку
   // Добавляет обработчики клика на кнопки
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_'))
        .split('_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
    // Сбрасывает все кнопки
  buttonsArray.forEach((button) => {
    button.classList.remove('head__menu-btn_active');
    button.removeAttribute('disabled');
  });
  // Находит кнопк
  const target = buttonsArray.find((button) =>
    button.classList.contains(`head__menu-btn_${theme}`)
  );
  // Активирует найденную кнопку
  if (target) {
    target.classList.add('head__menu-btn_active');
    target.setAttribute('disabled', true);
  } else {
     // Если тема не найдена, то актифируется авто режим
    const autoButton = document.querySelector(
      '.head__menu-btn_auto'
    );
    autoButton.classList.add('head__menu-btn_active');
    autoButton.setAttribute('disabled', true);
  }
}
