import eel
import os
import time

eel.init('www')

odis_exe = r'C:\Windows\notepad.exe'
delphi_exe = r'C:\Windows\notepad.exe'
wlan_interface_name = '"Wi-Fi 2"'
network_to_connect = '"VAS-6154"'


@eel.expose
def odis_reset_and_connect():
    status = False
    try:
        os.popen('netsh wlan disconnect')
        os.popen(f'netsh interface set interface {wlan_interface_name} disable')
        time.sleep(3)
        os.popen(f'netsh interface set interface {wlan_interface_name} enable')
    except Exception as error:
        print(error)

    index = 0

    while not status:
        show_networks = os.popen('netsh wlan show networks').read()
        if 'VAS-6154' in show_networks:
            os.popen(f'netsh wlan connect name={network_to_connect}')
            try:
                os.startfile(odis_exe)
                status = True
            except FileNotFoundError:
                eel.something_wrong()
                status = True
        elif index == 5:
            eel.odis_not_connected()
            status = True
        else:
            index += 1
            time.sleep(1)
            status = False


@eel.expose
def start_odis_force():
    os.popen('netsh wlan disconnect')
    time.sleep(2)
    try:
        os.startfile(odis_exe)
    except FileNotFoundError:
        eel.something_wrong()


@eel.expose
def delphi():
    time.sleep(2)
    try:
        os.startfile(delphi_exe)
    except FileNotFoundError:
        eel.something_wrong()


@eel.expose
def startOdis():
    eel.confirm_odis()


@eel.expose
def startDelphi():
    eel.confirm_delphi()


if __name__ == '__main__':
    eel.start('index.html', size=(400, 350), options={'port': 2208}, suppress_error=True)
