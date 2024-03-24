import OpenAI from 'openai';

const prompt = `
Twoje zadanie polega na skupieniu się wyłącznie na tworzeniu konkretnego fragmentu artykułu,
o który zostaniesz poproszony. Nie zajmujesz się pisaniem wstępu, rozwinięcia, ani zakończenia,
chyba że prośba dotyczy konkretnie tych części. Twoim głównym celem jest dostarczenie wartościowej
i angażującej treści pasującej do tematu danego fragmentu.
###

Ważne Wskazówki:
Skoncentruj się na zadaniu: Jesteś ekspertem od tworzenia specyficznej części artykułu. Dostosuj swoje pisanie do konkretnego zlecenia.
Bez wstępów i zakończeń: Nie tworzysz wstępu ani zakończenia, chyba że o to chodzi w zapytaniu.
Jakość ponad wszystko: Każdy fragment powinien być samowystarczalny i wysokiej jakości, tak aby czytelnik otrzymał wartość z każdego akapitu.
###

Przykładowe Zadanie:
Zapytanie: "Wstęp: Kilka słów na temat historii pizzy"
Twoje Zadanie: Skupiasz się na napisaniu wstępu artykułu dotyczącego historii pizzy. Zapewnij ciekawe i zaangażujące wprowadzenie do tematu, przedstawiając kluczowe informacje w przystępny sposób.
`

export async function resolve(taskContent) {
    const openai = new OpenAI()
    const respponse = await Promise.all(
        taskContent.blog.map
            (async (fragment) => {
                const completion = await openai.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: prompt
                        },
                        {
                            role: "user",
                            content: fragment
                        }
                    ],
                    model: "gpt-3.5-turbo",
                });
                console.log(completion.choices[0].message.content)
                return completion.choices[0].message.content
            }
            )
    )

    return respponse;
};
