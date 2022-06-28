const main = function () {
    const user = document.currentScript.getAttribute("username");
    const id = document.currentScript.getAttribute("id");
    const append = document.currentScript.getAttribute("append");
    const scripts = document.getElementById(document.currentScript.getAttribute("scripts")).innerHTML;
    const styles = document.getElementById(document.currentScript.getAttribute("styles")).innerHTML;

    fetch(`https://gist.githubusercontent.com/${user}/${id}/raw`)
        .then((res) => res.text())
        .then((data) => {
            const iframe = document.createElement("iframe");
            iframe.id = "ghbed";
            document.getElementById(append).appendChild(iframe);
            data.replace(/\n/g, "<br />");
            data.replace(/</g, "&lt");
            data.replace(/>/g, "&gt");
            document.getElementById("ghbed").contentWindow.document.head.innerHTML = `<style>${styles}</style><script>${scripts}<\/script>`;
            document.getElementById("ghbed").contentWindow.document.body.innerText = data;
        });
};

main();
