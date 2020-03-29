cnae = JSON.parse(dados_cnae);

output_tree = ""
child_map = {}
cod_map = {}
selected_nodes = []

function load_array(arr, current_id, depth=0) {
    for ( element_index in arr ) {
        load_dict(arr[element_index], current_id, depth);
    };
};


function load_dict(dict, parent_id="", depth=0) {
    if ( parent_id != "" ) {
        parent_prefix = parent_id + '-'
    } else {
        parent_prefix = ''
    }

    current_id = dict.cod
    next_depth = depth + 1
    indent = 15 * depth

    cod_map[dict.info] = current_id

    if ( dict.filhos != undefined ) {
        if ( depth == 0 ) {
            output_tree += make_root_node_with_child(indent, current_id, dict.info); 
        } else {
            output_tree += make_tree_node_with_child(parent_id, indent, current_id, dict.info)
        };

        map_child_node(dict.info, dict.filhos)
        load_array(dict.filhos, current_id, next_depth);

    } else {
        if ( depth == 0 ) {
            output_tree += make_root_node_without_child(indent, current_id, dict.info); 
        } else {
            output_tree += make_tree_node_without_child(parent_id, indent, current_id, dict.info); 
        };
    };
};



function select_or_discard_node(node_id) {
    if ( selected_nodes.includes(node_id)) {
        selected_nodes.pop(node_id)
    } else {
        selected_nodes.push(node_id)
    };
};



function map_child_node(current_node, arr_of_child_nodes) {
    if ( current_node in child_map ) {} else {
        child_map[current_node] = []
    }
    
    for ( index in arr_of_child_nodes ) {
        if ( arr_of_child_nodes[index].filhos !== undefined ) {
            if ( child_map[current_node].includes(arr_of_child_nodes[index].info)) {} else {
                child_map[current_node].push(arr_of_child_nodes[index].info);
            }
            map_child_node(current_node, arr_of_child_nodes[index].filhos);
        }
        if ( child_map[current_node].includes(arr_of_child_nodes[index].info)) {} else {
            child_map[current_node].push(arr_of_child_nodes[index].info);
        };
    };
};


function toggle_hide_show_child (element_info) {
    for ( i in child_map[element_info] ) {
        console.log(child_map[element_info][i])
        console.log(cod_map[child_map[element_info][i]])
   
    
        element_to_toggle = document.getElementById(cod_map[child_map[element_info][i]]);
        if (element_to_toggle.style.display === "none") {
            element_to_toggle.style.display = "block";
          } else {
            element_to_toggle.style.display = "none";
          };
    };
};

function make_root_node_with_child(indent, current_id, info) {
    output  = '<div style="margin-left:'+ indent + 'px;"'
    output += 'id="' + current_id + '">'
    output += '<input type="button" class="btn" onclick=toggle_hide_show_child("' + info+ '")>'
    output += '<input type="checkbox" onclick=select_or_discard_node("' + current_id + '")>' + info + '</div>'
    return output
};

function make_root_node_without_child(indent, current_id, info) {
    output  = '<div style="margin-left:' + indent + 'px;"'
    output += 'id="' + current_id + '">'
    output += '<input type="button" class="btn2">'
    output += '<input type="checkbox" onclick=select_or_discard_node("' + current_id + '")>' + info + '</div>'
    //output += '<input type="checkbox">' + info + '</div>'
    return output
};

function make_tree_node_with_child(parent_id, indent, current_id, info) {
    output  = "<div class='" +"filho_de_" + parent_id + "'"
    output += "style='margin-left:" + indent + "px;'"
    output += 'id="'+ current_id + '">' 
    output += '<input type="button" class="btn" onclick="toggle_hide_show_child(' + "'" + info + "'" + ')">'
    output += '<input type="checkbox" onclick=select_or_discard_node("' + current_id + '")>' + info + '</div>'   
    // output += '<input type="checkbox">' + info + '</div>'
    return output
};

function make_tree_node_without_child(parent_id, indent, current_id, info) {
    output  = "<div class='" +"filho_de_" + parent_id + "'"
    output += "style='margin-left:" + indent + "px;'"
    output += 'id="' + current_id + '">' 
    output += '<input type="button" class="btn2">'
    output += '<input type="checkbox" onclick=select_or_discard_node("' + current_id + '")>' + info + '</div>'    
    //output += '<input type="checkbox">' + info + '</div>'
    return output
};

load_array(cnae, current_id="");

tree_div = document.getElementById('tree');
tree_div.innerHTML = output_tree;
