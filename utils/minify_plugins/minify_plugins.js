const fs = require("fs");
const jsMinifier = require("terser");
const CleanCSS = require("clean-css");

const _BASE_PATH = "../../inginious/frontend/plugins";
const _UNCODE_PLUGIN_PATH = `${_BASE_PATH}/UNCode/static`;
const _UN_TEMPLATE_PLUGIN_PATH = `${_BASE_PATH}/UN_template/static`;
const _STATISTICS_PLUGIN_PATH = `${_BASE_PATH}/statistics/static`;
const _REGISTER_STUDENTS_PLUGIN_PATH = `${_BASE_PATH}/register_students/static`;
const _MULTILANG_PLUGIN_PATH = `${_BASE_PATH}/multilang/static`;
const _GRADER_GENERATOR_PLUGIN_PATH = `${_BASE_PATH}/grader_generator/static`;
const _CODE_PREVIEW_PLUGIN_PATH = `${_BASE_PATH}/code_preview/static`;
const _ANALYTICS_PLUGIN_PATH = `${_BASE_PATH}/analytics/static`;
const _PLAGIARISM_PLUGIN_PATH = `${_BASE_PATH}/plagiarism/static`;
const _TASK_EDITORIAL_PATH = `${_BASE_PATH}/task_editorial/static`;
const _CONTACT_PAGE_PLUGIN_PATH = `${_BASE_PATH}/contact_page/static`;
const _MANUAL_SCORING_PATH = `${_BASE_PATH}/manual_scoring/static`;
const _TASK_HINTS_PATH = `${_BASE_PATH}/task_hints/static`;
const _COURSE_CREATION_PATH = `${_BASE_PATH}/course_creation/static`;
const _USER_MANAGEMENT_PATH = `${_BASE_PATH}/user_management/static`;
const _LTI_REGISTER_PATH = `${_BASE_PATH}/lti_register/static`;


/**
 * Read file synchronously.
 * @param fileName
 * @returns String containing the read text.
 */
function readFile(fileName) {
    return fs.readFileSync(fileName, "utf8");
}

/**
 * Read all js files.
 * @param jsFiles Array containing the path of every file.
 * @returns Object where the key is the file path and value is a string with the read file.
 */
function readJSFiles(jsFiles) {
    const jsCode = {};
    jsFiles.forEach((file) => {
        jsCode[file] = readFile(file);
    });
    return jsCode;
}

/**
 * Write file asynchronously with the minified text.
 * @param fileName e.g /INGInious/inginious/frontend/plugins/UNCode/static/js/test.js
 * @param data Minified text to be wrote in the file.
 */
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, "utf8", (err) => {
        if (err) {
            console.log("There was an error creating file " + fileName);
            return;
        }
        console.log(`The file ${fileName} has been saved!`);
    });
}

/**
 * Generates the css minified file in `outputFilePath` with the given name by `outputFileName`. The files
 * specified in `cssFiles` are joint and then parsed.
 * @param cssFiles: List of file names
 * @param outputFilePath: Path where the new file is created.
 * @param outputFileName: Name for the new file (Without file extension).
 */
function minifyCssFiles(cssFiles, outputFilePath, outputFileName) {
    const result = new CleanCSS().minify(cssFiles);
    if (result.errors.length) {
        console.log("There were some errors while minifying css files: " + result.errors);
    } else {
        writeFile(outputFilePath + outputFileName + ".min.css", result.styles);
    }
}

/**
 * Generates the js minified file in `outputFilePath` with the given name by `outputFileName`. The files
 * specified in `jsFiles` are joint and then parsed.
 * @param jsFiles: List of file names
 * @param outputFilePath: Path where the new file is created.
 * @param outputFileName: Name for the new file (Without file extension).
 */
function minifyJSFiles(jsFiles, outputFilePath, outputFileName) {
    const jsCode = readJSFiles(jsFiles);
    const result = jsMinifier.minify(jsCode);
    if (result.error) {
        console.log("There was an error minifying JS files. Check files name.");
    } else {
        writeFile(outputFilePath + outputFileName + ".min.js", result.code);
    }
}

function getCssFilePath(filePath, name) {
    return filePath + name + ".css";
}

function getJSFilePath(filePath, name) {
    return filePath + name + ".js";
}

function minifyUNCodePlugin() {
    const jsFilesPath = _UNCODE_PLUGIN_PATH + "/js/";
    const cssFilesPath = _UNCODE_PLUGIN_PATH + "/css/";
    const jsFiles = ["task_files_tab", "uncode"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const cssFiles = ["uncode"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'UNCode' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "UNCode");

    minifyCssFiles(cssFiles, cssFilesPath, "UNCode");
}

function minifyUNTemplatePlugin() {
    const jsFilesPath = _UN_TEMPLATE_PLUGIN_PATH + "/js/";
    const cssFilesPath = _UN_TEMPLATE_PLUGIN_PATH + "/css/";
    const jsFiles = ["unal"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const cssFiles = ["reset", "unal", "base", "tablet", "phone", "small", "printer", "new_unal"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'UN_template' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "unal");

    minifyCssFiles(cssFiles, cssFilesPath, "UN_template");
}

function minifyStatisticsPlugin() {
    const jsFilesPath = _STATISTICS_PLUGIN_PATH + "/js/";
    const cssFilesPath = _STATISTICS_PLUGIN_PATH + "/css/";
    const cssFiles = ["statistics"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'statistics' static files.");

    minifyCssFiles(cssFiles, cssFilesPath, "statistics");

    let jsFiles = ["statistics", "course_admin_statistics"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    minifyJSFiles(jsFiles, jsFilesPath, "course_admin_statistics");

    jsFiles = ["statistics", "user_statistics"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    minifyJSFiles(jsFiles, jsFilesPath, "user_statistics");
}

function minifyRegisterStudentsPlugin() {
    const jsFilesPath = _REGISTER_STUDENTS_PLUGIN_PATH + "/js/";
    const cssFilesPath = _REGISTER_STUDENTS_PLUGIN_PATH + "/css/";
    const jsFiles = ["register"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const cssFiles = ["register_students"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'register_students' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "register");

    minifyCssFiles(cssFiles, cssFilesPath, "register_students");
}

function minifyMultilangPlugin() {
    const jsFilesPath = _MULTILANG_PLUGIN_PATH + "/";
    const cssFilesPath = _MULTILANG_PLUGIN_PATH + "/";

    console.log("Minify 'multilang' static files.");

    let jsFiles = ["pythonTutor", "codemirror_linter", "lint", "custom_input"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    minifyJSFiles(jsFiles, jsFilesPath, "tools");

    jsFiles = ["multilang", "grader"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    minifyJSFiles(jsFiles, jsFilesPath, "multilang");

    jsFiles = ["hdlgrader"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    minifyJSFiles(jsFiles, jsFilesPath, "hdlgrader");

    let cssFiles = ["lint"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });
    minifyCssFiles(cssFiles, cssFilesPath, "tools");

    cssFiles = ["multilang"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });
    minifyCssFiles(cssFiles, cssFilesPath, "multilang");
}

function minifyGraderGeneratorPlugin() {
    const jsFilesPath = _GRADER_GENERATOR_PLUGIN_PATH + "/js/";
    const cssFilesPath = _GRADER_GENERATOR_PLUGIN_PATH + "/css/"
    const jsFiles = ["grader", "grader_generator", "notebook_grader_generator"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const cssFiles = ["grader_tab"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'grader_generator' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "grader_generator");
    minifyCssFiles(cssFiles, cssFilesPath, "grader_tab");
}

function minifyCodePreviewPlugin() {
    const jsFilesPath = _CODE_PREVIEW_PLUGIN_PATH + "/js/";
    const jsFiles = ["code_preview_load"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'code_preview' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "code_preview_load");
}

function minifyAnalyticsPlugin() {
    const jsFilesPath = _ANALYTICS_PLUGIN_PATH + "/js/";
    const cssFilesPath = _ANALYTICS_PLUGIN_PATH + "/css/";
    const jsFiles = ["analytics", "box_plot", "calendar_view", "radar", "time_series", "stacked_bar_plot"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    const cssFiles = ["analytics"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'analytics' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "analytics");
    minifyCssFiles(cssFiles, cssFilesPath, "analytics");
}

function minifyPlagiarismPlugin() {
    const cssFilesPath = _PLAGIARISM_PLUGIN_PATH + "/css/";

    const cssFiles = ["plagiarism"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'plagiarism' static files.");

    minifyCssFiles(cssFiles, cssFilesPath, "plagiarism");
}

function minifyManualScoringPlugin() {
    const cssFilesPath = _MANUAL_SCORING_PATH + "/css/";
    const jsFilesPath = _MANUAL_SCORING_PATH + "/js/";

    const commonJsFiles = ["manual_scoring_constants", "code_area", "message_box", "rubric"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const manualScoringJsFiles = ["manual_scoring_main"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });
    const feedbackJsFiles = ["feedback_main"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    const courseTaskListJsFiles = ["message_box", "task_list_main"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    const cssFiles = ["manual_scoring"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    console.log("Minify 'manual scoring' static files.");

    minifyJSFiles(commonJsFiles, jsFilesPath, "common_files");
    minifyJSFiles(manualScoringJsFiles, jsFilesPath, "manual_scoring");
    minifyJSFiles(feedbackJsFiles, jsFilesPath, "feedback");
    minifyJSFiles(courseTaskListJsFiles, jsFilesPath, "course_task_list");
    minifyCssFiles(cssFiles, cssFilesPath, "manual_scoring");
}

function minifyTaskEditorialPlugin() {
    const jsFilesPath = _TASK_EDITORIAL_PATH + "/";

    const jsFiles = ["task_editorial", "task_editorial_preview"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'task_editorial' static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "task_editorial");
}

function minifyContactPagePlugin() {
    const cssFilesPath = _CONTACT_PAGE_PLUGIN_PATH + "/css/";
    const jsFilesPath = _CONTACT_PAGE_PLUGIN_PATH + "/js/";

    const cssFiles = ["contact_page"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });

    const jsFiles = ["message_box", "contact_page_form", "contact_page_main"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'Contact page' static files.");

    minifyCssFiles(cssFiles, cssFilesPath, "contact_page");
    minifyJSFiles(jsFiles, jsFilesPath, "contact_page");
}

function minifyTaskHintsPlugin() {
    const jsFilesPath = _TASK_HINTS_PATH + "/js/";
    const cssFilesPath = _TASK_HINTS_PATH + "/css/";

    console.log("Minify 'task_hints' static files.");

    let jsFiles = ["show_hints"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    })
    minifyJSFiles(jsFiles, jsFilesPath, "show_hints");
    jsFiles = ["hints_edit"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    })
    minifyJSFiles(jsFiles, jsFilesPath, "hints_edit");

    let cssFiles = ["show_hints"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    })
    minifyCssFiles(cssFiles, cssFilesPath, "show_hints");
}

function minifyCourseCreationPlugin() {
    const jsFilesPath = _COURSE_CREATION_PATH + "/js/";

    const jsFiles = ["course_creation"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'Course creation' plugin static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "course_creation");
}

function minifyUserManagementPlugin() {
    const cssFilesPath = _USER_MANAGEMENT_PATH + "/css/";
    const jsFilesPath = _USER_MANAGEMENT_PATH + "/js/";

    const cssFiles = ["user_management"].map((name) => {
        return getCssFilePath(cssFilesPath, name);
    });
    const jsFiles = ["user_data", "user_list", "confirmation_modal", "user_status", "user_management"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'User Management' plugin static files.");

    minifyCssFiles(cssFiles, cssFilesPath, "user_management");
    minifyJSFiles(jsFiles, jsFilesPath, "user_management");
}

function minifyLTIRegisterPlugin(){
    const jsFilesPath = _LTI_REGISTER_PATH + "/js/";

    const jsFiles = ["register_user_lti"].map((name) => {
        return getJSFilePath(jsFilesPath, name);
    });

    console.log("Minify 'LTI registration' plugin static files.");

    minifyJSFiles(jsFiles, jsFilesPath, "register_user_lti");
}

minifyUNCodePlugin();
minifyUNTemplatePlugin();
minifyStatisticsPlugin();
minifyRegisterStudentsPlugin();
minifyMultilangPlugin();
minifyGraderGeneratorPlugin();
minifyCodePreviewPlugin();
minifyAnalyticsPlugin();
minifyPlagiarismPlugin();
minifyManualScoringPlugin();
minifyTaskEditorialPlugin();
minifyContactPagePlugin();
minifyTaskHintsPlugin();
minifyCourseCreationPlugin();
minifyUserManagementPlugin();
minifyLTIRegisterPlugin();
