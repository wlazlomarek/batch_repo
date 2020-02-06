function odis_running() {
    Swal.fire({
        html: 'Łączenie...',
        background: '#232331',
        timer: 10000,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('b')
                .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })
}

function delphi_running() {
    Swal.fire({
        html: 'Łączenie...',
        background: '#232331',
        timer: 2000,
        onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('b')
                .textContent = Swal.getTimerLeft()
        }, 100)
      },
      onClose: () => {
        clearInterval(timerInterval)
      }
    })
}

eel.expose(confirm_odis)
function confirm_odis() {
    Swal.fire({
        icon: 'info',
        title: 'Parowanie...',
        html: 'Podłącz zestaw diagnostyczny <font color=#f27474>VAS-6154</font> do gniazda ODB, a następnie naciśnij OK',
        background: '#232331',
        confirmButtonColor: '#f27474',
        // buttonsStyling: false,
      }).then((result) => {
      if (result.value) {
        odis_running();
        eel.odis_reset_and_connect();
  }
})
}

eel.expose(confirm_delphi)
function confirm_delphi() {
    Swal.fire({
        icon: 'info',
        title: 'Parowanie...',
        html: 'Podłącz zestaw diagnostyczny <font color=#f27474>Delphi</font> do gniazda ODB, a następnie naciśnij OK',
        background: '#232331',
        confirmButtonColor: '#f27474',
        // buttonsStyling: false,
      }).then((result) => {
      if (result.value) {
        delphi_running();
        eel.delphi();
  }
})
}


eel.expose(odis_not_connected)
function odis_not_connected() {
    Swal.fire({
      title: 'Błąd...',
      html: 'Nie znaleziono interfejsu <font color=#f27474>VAS-6154</font>, sprawdź połączenie!</br>Czy chcesz wykonać próbę połaczenia przez port USB?',
      background: '#232331',
      showCancelButton: true,
      confirmButtonColor: '#f27474',
      cancelButtonColor: '#d9a9a9',
      cancelButtonText: 'Nie',
      confirmButtonText: 'Tak',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
        icon: 'info',
        title: 'USB',
        html: 'Podłącz zestaw diagnostyczny <font color=#f27474>VAS-6154</font> do gniazda ODB, przy użyciu kabla USB. Następnie naciśnij OK',
        background: '#232331',
        confirmButtonColor: '#f27474',
      }).then((result) => {
      if (result.value) {
        delphi_running();
        eel.start_odis_force();
                }
               })
              }
             }
            )
}

eel.expose(something_wrong)
function something_wrong() {
    Swal.fire({
        icon: 'error',
        title: 'Błąd...',
        html: 'Nie można odnaleźć pliku startowego.',
        background: '#232331',
        confirmButtonColor: '#f27474',
        // buttonsStyling: false,
      })
}

function startOdis() {
    confirm_odis();
}

function startDelphi() {
    confirm_delphi();

}


