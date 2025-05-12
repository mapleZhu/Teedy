'use strict';

angular.module('docs').factory('TranslationService', ['Restangular', '$q', function(Restangular, $q) {
  return {
    /**
     * 翻译文件内容
     * @param {string} fileId 文件ID
     * @param {string} targetLanguage 目标语言代码
     */
    translateFile: function(fileId, targetLanguage) {
      return Restangular.one('file', fileId).one('translate').post({}, {
        targetLanguage: targetLanguage
      });
    },
    
    /**
     * 获取翻译状态
     * @param {string} taskId 翻译任务ID
     */
    getTranslationStatus: function(taskId) {
      return Restangular.one('translation', taskId).get();
    }
  };
}]);