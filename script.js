  /* ======== MENU (mantém) ======== */
function toggleMenu() {
  const menu = document.querySelector('.menu');
  const toggle = document.querySelector('.menu-toggle');
  menu.classList.toggle('open');
  
  // Esconde o menu hamburguer quando o menu está aberto
  if (menu.classList.contains('open')) {
    toggle.style.display = 'none';
  } else {
    toggle.style.display = 'block';
  }
}
/* ======== SEÇÕES E NAVEGAÇÃO (mantém sua lógica) ======== */
const SECTIONS = {
  step1: document.getElementById("step1"),
  step1b: document.getElementById("step1b"),
  step1c: document.getElementById("step1c"),
  step2: document.getElementById("step2"),
  step3: document.getElementById("step3"),
  step4: document.getElementById("step4"),
  step5: document.getElementById("step5")
};
let current = "step1";
let cameFromGroup = false;

function showSection(name) {
  Object.values(SECTIONS).forEach(s => { if (s) s.style.display = "none"; });
  if (SECTIONS[name]) SECTIONS[name].style.display = "block";
  current = name;
}
showSection("step1");

function validateSection(sectionEl) {
  if (!sectionEl) return true;
  const required = Array.from(sectionEl.querySelectorAll("[required]"));
  for (const field of required) {
    if (field.type === "radio") {
      const group = sectionEl.querySelectorAll(`input[name='${field.name}']`);
      const checked = Array.from(group).some(r => r.checked);
      if (!checked) return false;
    } else {
      if (!String(field.value || '').trim()) return false;
    }
  }
  return true;
}

function nextStep() {
  const currEl = SECTIONS[current];
  if (!validateSection(currEl)) {
    alert("Por favor, preencha todos os campos obrigatórios antes de continuar.");
    return;
  }

  // Validação específica para step3: verificar se o WhatsApp tem pelo menos 11 dígitos
  if (current === "step3") {
    const whatsappInput = document.getElementById("whatsapp");
    const digits = whatsappInput.value.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (digits.length < 11) {
      alert("Telefone incorreto. Certifique-se de incluir o DDD regional.");
      whatsappInput.focus();
      return;
    }
  }

  if (current === "step1") {
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
    if (tipo === "grupo") { cameFromGroup = true; showSection("step1b"); return; }
    else { cameFromGroup = false; atualizarCamposEtapa2(tipo); showSection("step2"); return; }
  }

  if (current === "step1b") {
    const qtd = parseInt(document.getElementById("qtdPessoas").value);
    if (!qtd || qtd < 1) { alert("Por favor, informe uma quantidade válida de pessoas."); return; }
    gerarCampos(); // botão também chama isso — fica ok
    return;
  }

  if (current === "step1c") { showSection("step3"); return; }
  if (current === "step2") { showSection("step3"); return; }
  if (current === "step3") { showSection("step4"); return; }
    if (current === "step4") { showSection("step5"); return; }
}

function previousStep() {
  if (current === "step1b") { showSection("step1"); cameFromGroup = false; return; }
  if (current === "step1c") { showSection("step1b"); return; }
  if (current === "step2" && cameFromGroup) { showSection("step1c"); return; }
  if (current === "step2") { showSection("step1"); return; }
  if (current === "step3") { showSection("step2"); return; }
  if (current === "step4") { showSection("step3"); return; }
      if (current === "step5") { showSection("step4"); return; }
}

function gerarCampos() {
  const qtd = parseInt(document.getElementById("qtdPessoas").value);
  if (!qtd || qtd < 1) { alert("Por favor, informe uma quantidade válida de pessoas."); return; }
  const campos = document.getElementById("camposPessoas");
  campos.innerHTML = "";
  const limit = Math.min(qtd, 20);
  for (let i = 1; i <= limit; i++) {
    const div = document.createElement("div");
    div.style.marginTop = "8px";
    div.innerHTML = `
      <label>Nome ${i}:<br>
        <input type="text" name="nome_pessoa_${i}" required>
      </label><br>
      <label>Aniversário ${i}:<br>
        <input type="date" name="aniversario_pessoa_${i}">
      </label><br>
    `;
    campos.appendChild(div);
  }
  showSection("step1c");
}

function atualizarCamposEtapa2(tipo) {
  const labelNome = document.getElementById("labelNome");
  const campoNome = document.getElementById("campoNome");
  const labelAniversario = document.getElementById("labelAniversario");
  const campoAniversario = document.getElementById("campoAniversario");
  if (!labelNome || !campoNome || !labelAniversario || !campoAniversario) return;

  if (tipo === "igreja") {
    labelNome.firstChild.nodeValue = "Nome da igreja:*\n";
    campoNome.name = "nome_igreja";
    labelAniversario.firstChild.nodeValue = "Aniversário da igreja:\n";
    campoAniversario.name = "aniversario_igreja";
  } else {
    labelNome.firstChild.nodeValue = "Nome e sobrenome:*\n";
    campoNome.name = "nome";
    labelAniversario.firstChild.nodeValue = "Aniversário:\n";
    campoAniversario.name = "aniversario";
  }
}

/* ====== SUBMIT: valida apenas campos VISÍVEIS e envia com fetch ====== */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitBtn = form.querySelector('button[type="submit"]');
  const prevBtns = form.querySelectorAll('button[type="button"]');
  
  // Desativa botões para evitar múltiplos envios
  submitBtn.disabled = true;
  prevBtns.forEach(btn => btn.disabled = true);
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Enviando...";

  // ===== Validação =====
  const visibleSections = Array.from(form.querySelectorAll("section")).filter(s => s.offsetParent !== null);
  const requiredVisible = visibleSections.flatMap(s => Array.from(s.querySelectorAll("[required]")));
  for (const field of requiredVisible) {
    if (field.type === "radio") {
      const group = form.querySelectorAll(`input[name='${field.name}']`);
      const checked = Array.from(group).some(r => r.checked);
      if (!checked) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        // reativa botões
        submitBtn.disabled = false;
        prevBtns.forEach(btn => btn.disabled = false);
        submitBtn.textContent = originalText;
        return;
      }
    } else {
      if (!String(field.value || "").trim()) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        field.focus();
        // reativa botões
        submitBtn.disabled = false;
        prevBtns.forEach(btn => btn.disabled = false);
        submitBtn.textContent = originalText;
        return;
      }
    }
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method || "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (response.ok || response.status === 302) {
      Object.values(SECTIONS).forEach(s => s && (s.style.display = "none"));
      successMessage.style.display = "block";
      successMessage.scrollIntoView({ behavior: "smooth" });
      form.reset();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        document.activeElement?.blur();
      }, 50);
    } else {
      alert("Erro ao enviar o formulário. Tente novamente em alguns instantes.");
    }

  } catch (err) {
    console.error("Erro no envio:", err);
    alert("Erro de conexão. Verifique sua internet e tente novamente.");
  } finally {
    // Reativa os botões (mesmo em caso de erro)
    submitBtn.disabled = false;
    prevBtns.forEach(btn => btn.disabled = false);
    submitBtn.textContent = originalText;
  }
});

});

/* expõe funções para uso inline nos botões */
window.nextStep = nextStep;
window.previousStep = previousStep;
window.gerarCampos = gerarCampos;
window.atualizarCamposEtapa2 = atualizarCamposEtapa2;

