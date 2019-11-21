<template>
  <div class="container">
    <div class="login-content">
      <div class="left-side-section">
        <g-img height="100%" src="https://s1.1zoom.me/b5050/259/Knife_Bell_pepper_Onion_Garlic_Carrots_Vegetables_572682_1600x1200.jpg" width="100%"></g-img>
      </div>
      <div class="right-side-section">
        <div class="header-section">
          <img alt="" height="40px" src="../../assets/home/login-logo.jpg" width="240px"/>
        </div>
        <div class="textfield-section">
          <p class="introduction-line">Enter your passcode to login</p>
          <g-text-field class="input-text-field" error type="password" v-model="password">
            <template v-slot:hint v-if="password.length < 6">
                <g-icon size="16px" color="red" style="margin-right: 8px">mdi-close-circle</g-icon>
                <p style="color: #F44336;">Passcode is incorrect</p>
            </template>
          </g-text-field>
        </div>
        <div class="input-section">
          <pos-login-keyboard v-model="password" style="height: 100%"></pos-login-keyboard>
        </div>
        <div class="footer-section">
          <g-btn text height="60px" style="margin-right: 20px">Version</g-btn>
          <g-btn @click="keyboardOn = !keyboardOn" text height="60px" style="margin-right: 20px">
            <g-icon class="g-icon__left">
              mdi-comment-question-outline
            </g-icon>
            Support
          </g-btn>
        </div>
      </div>
    </div>
    <!--    keyboard dialog-->
    <g-dialog lazy persistent v-model="keyboardOn" width="100%">
      <g-card height="650px" width="100%">
        <div class="dialog-content-wrapper">
          <g-grid-layout :layout="loginSupportDialog" style="height: 100%;">
            <p area="version" class="support-item"><b>Version: </b>{{this.version}}</p>
            <p area="network" class="support-item"><b>Network: </b>{{this.network}}</p>
            <p area="internet" class="support-item"><b>Internet: </b>{{this.internet}}</p>
            <p area="ssid" class="support-item"><b>SSID: </b>{{this.ssID}}</p>
            <p area="ip" class="support-item"><b>IP: </b>{{this.ip}}</p>

            <div area="keyboard_input" class="text-field-section" style="position: relative;height: 70px">
              <g-text-field class="w-85" clear-icon="cancel" clearable outlined style="color: #1d1d26" v-model="supportMessage"></g-text-field>
              <g-btn background-color="blue" class="send-btn" elevation="0" style="height: calc(100% + 1px)" text-color="white" width="15%">SEND</g-btn>
            </div>

            <div area="keyboard" class="keyboard-wrapper">
              <pos-keyboard-full v-model="supportMessage"/>
            </div>
          </g-grid-layout>

          <g-btn @click="keyboardOn = !keyboardOn" class="overlay-close-icon" icon style="position: absolute; top: 5px; right: 5px;">
            <g-icon>mdi-close</g-icon>
          </g-btn>
        </div>
      </g-card>
    </g-dialog>
  </div>
</template>

<script>
  import GImg from '../../components/GImg/GImg';
  import GTextField from '../../components/GInput/GTextField';
  import GBtn from '../../components/GBtn/GBtn';
  import GIcon from '../../components/GIcon/GIcon';
  import GDndDialog from '../../components/GDndDialog/GDndDialog';
  import GDialog from '../../components/GDialog/GDialog';
  import GCard from '../../components/GCard/GCard';
  import { GCardText, GCardActions, GCardSubtitle } from '../../components/GCard/GCardFunctionalComponent';
  import loginSupportDialog from '../login/loginSupportDialog'
  import GGridLayout from '../../components/GGridGenerator/GGridLayout';
  import PosKeyboardFull from '../../POSComponents/PosKeyboardFull';
  import PosLoginKeyboard from '../../POSComponents/POSInput/PosLoginKeyboard';

  export default {
    name: 'Login',
    components: { PosLoginKeyboard, PosKeyboardFull, GGridLayout, GBtn, GTextField, GImg, GIcon, GDndDialog, GDialog, GCard, GCardText, GCardActions, GCardSubtitle, },
    data: () => ({
      password: '',
      keyboardOn: false,
      version: 0.3,
      network: 'Wifi',
      internet: 'Yes',
      ssID: 'Giga5',
      ip: '192.168.10.90',
      label: 'Type your message here...',
      supportMessage: null,
      loginSupportDialog,
    })
  }
</script>

<style lang="scss" scoped>
  .login-content {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 40% 60%;
  }

  .dialog-content-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .text-field-section {
    background-color: rgba(196, 196, 196, 0.4);
    width: 100%;
    display: inline-flex;
    padding: 10px;

    .g-tf-input {
      text-align: center;
      letter-spacing: 12px;
      font-size: 30px;
      color: #1271ff;
    }

  }

  .support-item {
    //padding: 34px;
    margin-top: 34px;
    margin-left: 17px;
  }

  .send-btn {
    height: 100%;
  }

  ::v-deep .keyboard-wrapper {
    padding: 16px;
    background-color: #BDBDBD;

    .key {
      border-radius: 0;
      font-size: 24px;
    }
  }

  .g-tf-wrapper {
    margin: 0;
  }

  .container {
    height: 100%;
  }

  .left-side-section {
    grid-column: 1 / span 1;
  }

  .right-side-section {
    grid-column: 2 / span 1;
    display: grid;
    grid-template-rows: 15% 30% 35% 20%;
    justify-items: center;
  }

  .header-section {
    grid-row: 1 / span 1;
    width: 40%;
    height: 40%;
    position: relative;
    top: 70px;
  }

  .textfield-section {
    grid-row: 2 / span 1;
    width: 40%;

    .introduction-line {
      text-align: center;
      position: relative;
      font-size: 16px;
      top: 40px;
    }
  }


  //Input section
  .input-text-field {
    position: relative;
    top: 120px;

    ::v-deep .g-tf .inputGroup .g-tf-input {
      text-align: center;
      font-size: 24px;
      letter-spacing: 12px;
      color: #2196F3;
    }
  }

  .input-section {
    /*display: grid;*/
    width: 70%;
    /*grid-template-rows: 25% 25% 25% 25%;*/
    /*grid-template-columns: 25% 25% 25% 25%;*/
    /*justify-items: stretch;*/
    /*grid-gap: 10px;*/
  }

  .footer-section {
    grid-row: 4 / span 1;
    position: fixed;
    bottom: 0;
    right: 0;
  }

  .btn {
    border-color: rgba(0, 0, 0, 0.43);
    font-size: 20px !important;
  }
</style>
