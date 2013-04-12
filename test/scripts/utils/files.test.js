/**
 * AUTHOR: mrassinger
 * COPYRIGHT: E2E Technologies Ltd.
 */
var fileUtilsModule = require('../../../lib/utils/file.js');

exports.testCleanPath = function(test) {
    var cleanPath = fileUtilsModule.cleanPath("0¦1+2\"3#4*5ç6&7¬8@9|a¢b(c)d?e^f~g`h!i{j}k;l:m,n o<p>q[r]");
    test.equal(cleanPath, "0123456789abcdefghijklmnopqr", "testCleanPath");
    test.done();
};

exports.testTraversingProject = function(test){

    var projectDir = "test/resources/projects/simpleBPMN";
    var files = [];

    fileUtilsModule.traverseFileSystem(projectDir, function(filePath, fileName, fullQualifiedName) {
        var extension = fileUtilsModule.getFileExtension(fileName);
        files.push({
            filePath: filePath,
            fileName: fileName,
            fullQualifiedName: fullQualifiedName,
            extension: extension
        });
    });

    test.deepEqual(files,
        [
            {
                "filePath": "test/resources/projects/simpleBPMN",
                "fileName": "taskExampleProcess.bpmn",
                "fullQualifiedName": "test/resources/projects/simpleBPMN/taskExampleProcess.bpmn",
                "extension": "bpmn"
            },
            {
                "filePath": "test/resources/projects/simpleBPMN",
                "fileName": "taskExampleProcess.js",
                "fullQualifiedName": "test/resources/projects/simpleBPMN/taskExampleProcess.js",
                "extension": "js"
            }
        ],
        "fileUtilities.testTraversingProject");

    test.done();
};