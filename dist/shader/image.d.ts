export declare const imagePointShader_A = "\nattribute vec4 a_position;\nattribute vec2 a_texcoord;\n\nuniform mat4 u_matrix;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n   gl_Position = u_matrix * a_position;\n   v_texcoord = a_texcoord;\n}";
export declare const imageFragmentShader_A = "precision mediump float;\n\nvarying vec2 v_texcoord;\n\nuniform sampler2D u_texture;\n\nvoid main() {\n   gl_FragColor = texture2D(u_texture, v_texcoord);\n}";