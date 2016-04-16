/*global module:false*/
module.exports = function(grunt) {
    var publishVersion = "v20160415";

    // 汉字 Unicode 转码   使用时不需要解码
    // function native2ascii(character) {
    //     character.split("");
    //     var ascii = "";
    //     for (var i = 0; i < character.length; i++) {
    //         var code = Number(character[i].charCodeAt(0));
    //         var charAscii = code.toString(16);
    //         charAscii = new String("0000")
    //             .substring(charAscii.length, 4) + charAscii;
    //         ascii += "\\u" + charAscii;
    //     }
    //     return ascii;
    // }

    /**
     *  合并文件的映射关系
     */
    var ued_conf = require("./page_list.js"), //引用page_list文件内容
        ued_concat = {}, //要合并的文件对象
        ued_trans = [], //要删除的临时文件
        ued_cssDistArr = [], //要合并的css文件数组
        ued_cssDistsObj = {}, //要合并的css 文件对象
        baseJsPath = "js", //js文件的根目录
        baseCssPath = "css", //css文件的根目录
        distPath = 'dist/' + publishVersion + '/', //目标版本路径
        ued_reqRce = {}, // requirejs 需要的数据
        ued_reqRceList = {}; //不明白作用 注释掉

    //目标文件名 - 要合并的文件
    //1.首先合并出uedimport
    ued_concat[distPath + 'ued.import.js'] = ['ued.conf.js', 'ued.concat.js', 'import.js'];

    //遍历page_list文件中的对象，准备生成合并后的文件
    for (var j in ued_conf) {
        var ASource = ued_conf[j],
            BSource = []; //完整的源路径
        // ADist = {}; //目标地址
        // BSource = BSource.concat(ASource); //将 Asource 复制给Bsource
        if (j.indexOf(".js") > -1) {
            //处理js文件 
            for (var n = 0; n < ASource.length; n++) {
                //遍历page_list中的每个要合并对象中的文件中的值
                var An = ASource[n]; //单个文件名
                if (An.indexOf('page_') > -1) {
                    ued_reqRce[distPath + j] = {};
                    ued_reqRce[distPath + j].options = {
                        baseUrl: baseJsPath,
                        name: An.replace('.js', ''),
                        out: distPath + baseJsPath + '/' + j
                    };
                    // ADist[n] = distPath + j;
                }
                BSource.push(baseJsPath + "/" + An);
            }
            ued_concat[distPath + baseJsPath + "/" + j] = BSource;
            ued_trans.push(distPath + baseJsPath + "/" + j);
            // for (var p = 0; p < BSource.length; p++) {
            //     BSource[p] = baseJsPath + "/" + BSource[p];
            // }
        } else if (j.indexOf(".css") > -1) {
            //处理css文件 
            for (var n = 0; n < ASource.length; n++) {
                BSource.push(baseCssPath + "/" + ASource[n]);
            }
            // for (var q = 0; q < BSource.length; q++) {
            //     BSource[q] = baseCssPath + "/" + BSource[q];
            // }
            ued_cssDistsObj[distPath + baseCssPath + "/" + j] = [distPath + baseCssPath + "/" + j];
            ued_cssDistArr.push(distPath + baseCssPath + "/" + j);
            ued_concat[distPath + baseCssPath + "/" + j] = BSource;
            ued_trans.push(distPath + baseCssPath + "/" + j);
        }
        ued_conf[j] = BSource; //重新的js文件 的路径
    }

    console.log('\n ued_conf: \n');
    console.log(ued_conf);
    console.log('\n ued_concat: \n');
    console.log(ued_concat);
    console.log('\n ued_cssDistArr: \n');
    console.log(ued_cssDistArr);
    console.log('\n ued_cssDistsObj: \n');
    console.log(ued_cssDistsObj);
    console.log('\n ued_concat: \n');
    console.log(ued_concat);
    console.log('\n ued_trans: \n');
    console.log(ued_trans);
    console.log('\n ued_reqRce: \n');
    console.log(ued_reqRce);
    console.log('\n ued_reqRceList: \n');
    console.log(ued_reqRceList);

    grunt.file.write('ued.concat.js', 'window.UED_publishTime ="' + new Date().getTime() + '";\nwindow.UED_Souce =' + JSON.stringify(ued_conf) + ';');


    /**
     *  压缩文件的映射关系
     */
    var ued_jsmin = {};
    var ued_mincss = {};

    for (var key in ued_concat) {
        if (distPath + 'ued.import.js' === key) {
            continue;
        }
        if (key.indexOf(".js") > -1) {
            ued_jsmin[key.replace(".js", "-min.js")] = ['<banner:meta.banner>', key];
        } else if (key.indexOf(".css") > -1) {
            //ued_min[i] = ['<banner:meta.banner>', i];
            ued_mincss[key.replace(".css", "-min.css")] = [key];
        }
    }
    // console.log(ued_jsmin);
    // console.log(ued_mincss);

    // 项目配置
    grunt.initConfig({
        //清除dist目录当前版本文件
        clean: {
            dist: ['dist/' + publishVersion + '/'],
            more: ued_trans
                // ued_trans 数据格式样式 [ 'dist/v20160117/testJS.js', 'dist/v20160117/testCSS.css' ]
        },

        //将css背景图片资源复制到dist中
        copy: {
            images: {
                expand: true,
                cwd: 'images/',
                src: '**',
                dest: 'dist/' + publishVersion + '/images'
            },
            // webfont: {
            //              expand: true,
            //              cwd: 'skin/fonts',
            //              src: '**',
            //              dest: 'dist/'+publishVersion+'/fonts'
            //          }
        },

        //将require中的js文件输出到1个文件
        requirejs: ued_reqRce,
        //ued_reqRce 格式如下
        // {
        //     'dist/v20160117/testJS.js': {
        //         options: {
        //             baseUrl: 'js',
        //             name: 'page_texxxxxt',
        //             out: 'dist/v20160117/js/testJS.js'
        //         }
        //     }
        // }

        //将css, js合并
        concat: ued_concat,
        // {
        //     'dist/v20160117/ued.import.js': ['ued.conf.js', 'ued.concat.js', 'import.js'],
        //     'dist/v20160117/testJS.js': ['js/test.js', 'js/page_texxxxxt.js'],
        //     'dist/v20160117/testCSS.css': ['css/test.css']
        // }

        qunit: {
            files: ['test/**/*.html']
        },

        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
            },
            globals: {
                jQuery: true,
            }
        },

        //压缩js
        uglify: {
            my_target: {
                files: ued_jsmin,
                    // { 'dist/v20160117/js/testJS-min.js': [ '<banner:meta.banner>', 'dist/v20160117/js/testJS.js' ] }
            }
        },
        //css检查
        csslint: {
            options: {
                csslintrc: 'css/.csslintrc',
            },
            src: "css/*.css",
        },
        //梳理css
        csscomb: {
            dist: {
                options: {
                    config: 'css/.csscomb.json',
                },
                files: ued_cssDistsObj,
            }
        },
        //压缩css
        cssmin: {
            compress: {
                files: ued_mincss,
                // { 'dist/v20160117/css/testCSS-min.css': [ 'dist/v20160117/css/testCSS.css' ] }
            }
        }
    });

    // 加载所有依赖插件
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    // 默认任务
    grunt.registerTask('dist-copy', ['clean:dist', 'copy']);
    grunt.registerTask('dist-clean', ['clean:more']);
    grunt.registerTask('css-check', ['csslint']);

    grunt.registerTask('dist-css', ['concat', 'csscomb', 'cssmin']);
    // grunt.registerTask('dist-js', ['requirejs', 'concat', 'uglify', 'dist-clean']);
    grunt.registerTask('dist-js', ['concat', 'uglify']);
    // grunt.registerTask('dist-js', ['requirejs', 'concat', 'dist-clean']);
    // grunt.registerTask('dist-js', ['requirejs', 'concat']);

    grunt.registerTask('default', ['dist-clean', 'dist-copy', 'dist-js', 'dist-css', 'dist-clean']);
    // grunt.registerTask('default', ['dist-copy', 'dist-js']);

    /*grunt.registerTask("makeui", "build ui moudle", function() {
        var filepath = "js/toolbar.htm";
        var code = grunt.file.read(filepath);
        code = code.replace(/\r|\n|\s{2,}/g, "");
        grunt.file.write("js/toolbar.tmpl.js", "YiQiGuang.ToolbarTmpl = '"+ code + "';");
        grunt.log.writeln("toolbar ui build success!");
    });*/
};
