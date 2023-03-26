const instanceList = document.querySelector(
	"#instance-list",
) as HTMLDataListElement;

/** @type {Array<string>} */
let instances = [];
try {
	const response = await fetch("/api/instances");
	instances = await response.json();
} catch (error) {
	console.error("Could not fetch instances:", error);
}

for (const instaneDomain of instances) {
	const $option = document.createElement("option");
	$option.value = instaneDomain;
	instanceList.append($option);
}
