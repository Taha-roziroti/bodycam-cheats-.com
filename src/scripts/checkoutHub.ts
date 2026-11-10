function openCheckoutHub() {
  const dialog = document.querySelector<HTMLDialogElement>('#checkout-hub');
  if (!dialog) {
    window.location.assign('/go/');
    return;
  }
  if (typeof dialog.showModal === 'function') {
    if (!dialog.open) dialog.showModal();
    return;
  }
  window.location.assign('/go/');
}

function initCheckoutHubDialog() {
  const dialog = document.querySelector<HTMLDialogElement>('#checkout-hub');
  dialog?.querySelectorAll('[data-checkout-hub-close]').forEach((btn) => {
    btn.addEventListener('click', () => dialog.close());
  });
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function initCheckoutHubTriggers() {
  document.querySelectorAll<HTMLElement>('[data-checkout-hub]').forEach((el) => {
    if (el.hasAttribute('data-checkout-hub-bound')) return;
    el.setAttribute('data-checkout-hub-bound', '');

    el.addEventListener('click', (event) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      event.preventDefault();
      openCheckoutHub();
    });
  });
}

export function initCheckoutHub() {
  initCheckoutHubDialog();
  initCheckoutHubTriggers();
  document.addEventListener('astro:after-swap', () => {
    initCheckoutHubDialog();
    initCheckoutHubTriggers();
  });
}
