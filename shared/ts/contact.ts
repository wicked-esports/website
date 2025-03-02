const form = document.getElementsByClassName("contact-form")[0];
const resultText = document.getElementsByClassName("contact-form-result-text")[0];
const entries = document.getElementsByClassName("contact-form-entry");
const mainEntry = document.getElementsByClassName("contact-form-main-input")[0] as HTMLTextAreaElement;

function onContactLoad()
{
    form.addEventListener("submit", onSubmit)
}

function onSubmit(e: Event)
{
    e.preventDefault();
    const data = new FormData(form as HTMLFormElement);
    fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfXGg-5xtwG7JBNbtb3UWOwIgX9I58vaoL2EosTcQFah-Nh7A/formResponse",
        {
            method: "POST",
            body: data,
            mode: "no-cors"
        })
        .then(() => 
        {
            for (let i = 0; i < entries.length; i++)
            {
                const entry = entries[i] as HTMLInputElement;
                entry.value = "";
            }
            mainEntry.value = "";
            resultText.textContent = "正常に送信されました。"
        })
        .catch(() => 
        {
            resultText.textContent = "エラーが発生しました。時間をおいてもう一度お試しください。"
        })
}

export { onContactLoad }