import { defineStore } from 'pinia';

// TYPE
export enum ToastType {
  Message = 'Message',
}

type GeneralType = {
  currentToast: ToastType[];
  errorMessage: string;
};

const state = (): GeneralType => ({
  currentToast: [],
  errorMessage: '',
});

export default defineStore('general', {
  state,
  actions: {
    addToast(name: ToastType) {
      this.currentToast.push(name);
    },
    removeToast() {
      const removed = this.currentToast.pop();
      // reset message
      if (removed === ToastType.Message) {
        this.errorMessage = '';
      }
    },
    updateMessage(msg: string) {
      this.errorMessage = msg;
      this.currentToast.push(ToastType.Message);
    },
  },
});
