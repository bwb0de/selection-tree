cnae = JSON.parse(dados_cnae);

output_tree = ""

function load_array(arr, current_id, depth=0) {
    for ( element_index in arr ) {
        load_dict(arr[element_index], current_id, depth);
    };
};


function load_dict(dict, parent_id="", depth=0) {
    keys = Object.keys(dict);

    if ( parent_id != "" ) {
        parent_prefix = parent_id + '-'
    } else {
        parent_prefix = ''
    }

    current_id = parent_prefix + dict.cod
    next_depth = depth + 1
    indent = 15 * depth

    if ( dict.filhos != undefined ) {
        if ( depth == 0 ) {
            output_tree += make_root_node_with_child(indent, current_id, dict.info); 
        } else {
            output_tree += make_tree_node_with_child(parent_id, indent, current_id, dict.info)
        };

        load_array(dict.filhos, current_id, next_depth);

    } else {
        if ( depth == 0 ) {
            output_tree += make_root_node_without_child(indent, current_id, dict.info); 
        } else {
            output_tree += make_tree_node_without_child(parent_id, indent, current_id, dict.info); 
        };
    };
};


function toggle_hide_show_child (class_id) {
    elements = document.getElementsByClassName(class_id);
    for ( e_idx in elements ) {
        if (elements[e_idx].style.display === "none") {
            elements[e_idx].style.display = "block";
          } else {
            elements[e_idx].style.display = "none";
          };
    };
};

function make_root_node_with_child(indent, current_id, info) {
    output  = "<div style='margin-left:"+ indent + "px;'"
    output += "id='"+ current_id + "'>"
    output +=  '<input type="button" class="btn" onclick=toggle_hide_show_child("'+ "filho_de_" + current_id + '")>'
    output += '<input type="checkbox">' + info + "</div>"
    return output
};

function make_root_node_without_child(indent, current_id, info) {
    output  = "<div style='margin-left:" + indent + "px;'"
    output += "id='" + current_id + "'>"
    output += '<input type="button" class="btn2"><input type="checkbox">' + info + "</div>"
    return output
};

function make_tree_node_with_child(parent_id, indent, current_id, info) {
    output  = "<div class='" +"filho_de_" + parent_id + "'"
    output += "style='margin-left:" + indent + "px;'"
    output += "id='"+ current_id + "'>" 
    output += '<input type="button" class="btn" onclick=toggle_hide_show_child("'+ "filho_de_" + current_id + '")>'
    output += '<input type="checkbox">' + info + "</div>"
    return output
};

function make_tree_node_without_child(parent_id, indent, current_id, info) {
    output  = "<div class='" +"filho_de_" + parent_id + "'"
    output += "style='margin-left:" + indent + "px;'"
    output += "id='"+ current_id + "'>" 
    output += '<input type="button" class="btn2"><input type="checkbox">' + info + "</div>"
    return output
};

load_array(cnae, current_id="");

tree_div = document.getElementById('tree');
tree_div.innerHTML = output_tree;
