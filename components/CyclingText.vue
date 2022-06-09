<template>
    <h2 class="mx-auto w-max
        text-neutral-100 text-2xl md:text-4xl">
        <transition name="cyclingText">
            {{ titleText }}
        </transition>
    </h2>
</template>

<script>
export default {
    data() {
        return {
            i: 0,
            myTitles: [
                "Programmer",
                "Software Developer",
                "Computer Expert"
            ]
        }
    },
    mounted() {
        setInterval(() => {
            this.i = (this.i == this.myTitles.length - 1) ? 0 : this.i + 1;
        }, 2 * 1000)
    },
    computed: {
        titleText() {
            return this.myTitles[this.i];
        }
    }
}
</script>