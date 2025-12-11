// js/modal.js
let modalRoot, lastFocused;
export function initModal(root){
  modalRoot = root;
}
export function openModal(contentHTML, label = 'Details') {
  if (!modalRoot) modalRoot = document.getElementById('modal-root');
  lastFocused = document.activeElement;
  modalRoot.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-label="${label}">
      <div class="modal">
        <div id="modal-content">${contentHTML}</div>
        <div style="text-align:right;margin-top:12px;">
          <button id="modal-close" class="btn">Close</button>
        </div>
      </div>
    </div>
  `;
  modalRoot.removeAttribute('aria-hidden');
  const close = document.getElementById('modal-close');
  close.focus();
  close.addEventListener('click', closeModal);
  document.addEventListener('keydown', handleKey);
}
function handleKey(e){
  if (e.key === 'Escape') closeModal();
}
export function closeModal(){
  if (!modalRoot) return;
  modalRoot.innerHTML = '';
  modalRoot.setAttribute('aria-hidden', 'true');
  document.removeEventListener('keydown', handleKey);
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}
