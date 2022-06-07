FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode
);

FilePond.setOptions({
  stylePanelAspectRatio: 150 / 150,
  imageResizeTargetWidth: 150,
  imageResizeTargetHeight: 150,
});
FilePond.parse(document.body);


function authorBookVerification() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}