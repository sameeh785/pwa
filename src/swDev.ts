export default function swDev() {
  function determineAppServerKey(): Uint8Array {
    const vapidPublicKey: string =
      "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding: string = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64: string = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData: string = window.atob(base64);
    const outputArray: Uint8Array = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  let swUrl: string = `${process.env.PUBLIC_URL}/sw.js`;

  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn("response", response);
    console.log("sa");
    return response.pushManager.getSubscription().then(function (subscription) {
      response.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: determineAppServerKey(),
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
}
