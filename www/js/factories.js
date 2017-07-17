angular.module('starter.factories', [])
    .factory('ImageUploadFactory', function ($q, $ionicLoading, $cordovaFileTransfer,CONFIG) {
        return {
            uploadImage: function (imageURI) {
                console.log('start upload image.');
                var deferred = $q.defer();

                uploadFile();

                function uploadFile() {
                    // $ionicLoading.show({template : 'Uploading image...'});
                    // Add the Cloudinary "upload preset" name to the headers
                    var uploadOptions = {
                        params: { 'upload_preset': CONFIG.cloudinaryPreset }
                    };
                    $cordovaFileTransfer
                        // Your Cloudinary URL will go here
                        .upload(CONFIG.cloudinaryURL, imageURI, uploadOptions)

                        .then(function (result) {
                            // Let the user know the upload is completed
                            // $ionicLoading.show({template : 'Done.', duration: 1000});
                            var response = JSON.parse(decodeURIComponent(result.response));
                            deferred.resolve(response);
                        }, function (err) {
                            // Uh oh!
                            // $ionicLoading.show({template : 'Failed.', duration: 3000});
                            deferred.reject(err);
                        }, function (progress) {

                        });
                }
                return deferred.promise;
            },
        }
    });
