import { useRef, useState } from "react";

async function authUser(data) {
  const result = await fetch("/auth", {
    method: "POST",
    body: data
  })

  return result.status == 200
}

function checkInput(data, nameInput, refInput) {
  if (data.get(nameInput) == "") {
    refInput.current.focus()
    return false
  }
  return true
}

function App() {
  const [signIn, setSignIn] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const refForm = useRef(null)
  const refSectionAuth = useRef(null)
  const refEmail = useRef(null)
  const refPassword = useRef(null)

  const handleSubmitForm = (e) => {
    const data = new FormData(refForm.current)
    const checkingСorrectData = async () => {
      const authResult = await authUser(data)
      if (authResult) {
        refSectionAuth.current.classList.add("auth_rotate")
        setTimeout(() => {
          setSignIn(true)
        }, 150)
      } else {
        setInvalid(true)
      }
    }

    e.preventDefault()
    setInvalid(false)

    if (!checkInput(data, "email", refEmail) || !checkInput(data, "password", refPassword)) {
      return
    }

    if (data.get("email") == "admin@email.com" && data.get("password") == "admin") {
      refSectionAuth.current.classList.add("auth_rotate")
      setTimeout(() => {
        setSignIn(true)
      }, 150)
    } else {
      checkingСorrectData()
    }
  }

  return (
    <>
      <section className="auth" ref={refSectionAuth}>
        <div className="auth__content">
          {signIn == false ?
            <>
              <h2 className="auth__title">Вход</h2>
              <form className="auth__form" id="auth" onSubmit={(e) => handleSubmitForm(e)} ref={refForm}>
                <input type="email" name="email" ref={refEmail} placeholder="Введите почту..." />
                <input type="password" name="password" ref={refPassword} placeholder="Введите пароль..." />
              </form>
              {invalid == true &&
                <p className="auth__error">*Неверный ввод данных</p>
              }
              <button type="submit" form="auth" className="auth__submit">Войти</button>
            </>
            : <>
              <p className="auth__complete">Вход выполнен!</p>
            </>
          }
        </div>
      </section>
      <div className="description">
        <span>Можно войти:</span>
        <span>Почта - admin@email.com</span>
        <span>Пароль - admin</span>
      </div>
    </>
  );
}

export default App;
